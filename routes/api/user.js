const express = require('express');
const router = new express.Router();

const db = require('../../helpers/database');
const utility = require('../../helpers/utility');
const validator = require('../../helpers/validator');
const userSchema = require('../../helpers/schemas/userSchema.json');

// curl -X POST http://localhost:3000/api/user/signup -H "Content-Type: application/json" -d '{"username":"bekzod", "password":"123456"}'
router.post('/signup/', function(req, res) {
    let errors = validator.assertValid(userSchema, req.body);
    if (errors.length > 0) {
        return res.status(400).json({message: errors});
    }

    let username = req.body.username;
    let password = req.body.password;

    // check if user already exists in the database
    db.users.findOne({
        username: username,
    }, function(err, user) {
        if (err) {
            return res.status(500).json({message: err});
        }
        if (user) {
            return res.status(409).json({message: 'Username is taken'});
        }

        // generate a new salt and hash
        let salt = utility.generateSalt();
        let hash = utility.generateHash(password, salt);

        // insert new user into the database
        db.users.update({
            username: username,
        }, {
            username: username,
            hash: hash,
            salt: salt,
        }, {
            upsert: true,
        }, function(err) {
            if (err) return res.status(500).json({message: err});

            return res.json({status: 'ok'});
        });
    });
});

// curl -X POST http://localhost:3000/api/user/signin -H "Content-Type: application/json" -c cookie.txt -d '{"username":"bekzod", "password":"123456"}'
router.post('/signin/', function(req, res) {
    let errors = validator.assertValid(userSchema, req.body);
    if (errors.length > 0) {
        return res.status(400).json({message: errors});
    }

    let username = req.body.username;
    let password = req.body.password;

    // retrieve user from the database
    db.users.findOne({
        username: username,
    }, function(err, user) {
        if (err) {
            return res.status(500).json({message: err});
        }
        if (!user) {
            return res.status(403).json({message: 'Invalid username or password'});
        }
        if (user.hash !== utility.generateHash(password, user.salt)) {
            return res.status(403).json({message: 'Invalid username or password'});
        }
        delete user.hash;
        delete user.salt;

        let token = utility.createJWTToken({user: user});
        return res.json({id: user._id, token: token});
    });
});

// curl -b cookie.txt -c cookie.txt http://localhost:3000/api/user/signout/
// router.get('/signout/', function (req, res) {

//     return res.redirect("/");
// });


module.exports = router;
