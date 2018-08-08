const router = require('express').Router();
const cookie = require('cookie');
const validator = require('validator');
const db = require('../../utility/database.js');
const utility = require('../../utility/utility.js');

var checkUserPass = function (req, res, next) {
    if (!('userName' in req.body)) return res.status(400).json({ "status": 400, "error": "Username is missing" });
    if (!('password' in req.body)) return res.status(400).json({ "status": 400, "error": "Password is missing" });

    if (!validator.isAlphanumeric(req.body.userName)) return res.status(400).json({ "status": 400, "error": "Username is invalid" });
    if (!validator.isAlphanumeric(req.body.password)) return res.status(400).json({ "status": 400, "error": "Password is invalid" });
    next();
};

//curl -X POST http://localhost:3000/api/user/signup -H "Content-Type: application/json" -d '{"userName":"bekzod", "password":"123"}'
router.post('/signup/', checkUserPass, function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;

    // check if user already exists in the database
    db.users.findOne({
        _id: userName
    }, function (err, user) {
        if (err) return res.status(500).json({ "status": 500, "error": err });
        if (user) return res.status(409).json({ "status": 409, "error": "Username is taken" });
        // generate a new salt and hash
        var salt = utility.generateSalt();
        var hash = utility.generateHash(password, salt);
        // insert new user into the database
        db.users.update({
            _id: userName
        }, {
            _id: userName,
            hash: hash,
            salt: salt
        }, {
            upsert: true
        }, function (err) {
            if (err) return res.status(500).json({ "status": 500, "error": err });

            return res.json({ "status": 200 });
        });
    });
});

//curl -X POST http://localhost:3000/api/user/signin -H "Content-Type: application/json" -c cookie.txt -d '{"userName":"bekzod", "password":"123"}'
router.post('/signin/', checkUserPass, function (req, res) {
    var userName = req.body.userName;
    var password = req.body.password;

    // retrieve user from the database
    db.users.findOne({
        _id: userName
    }, function (err, user) {
        if (err) return res.status(500).json({ "status": 500, "error": err });
        if (!user) return res.status(403).json({ "status": 403, "error": "Invalid username or password" });
        if (user.hash !== utility.generateHash(password, user.salt)) return res.status(403).json({ "status": 403, "error": "Invalid username or password" });

        var token = utility.createJWTToken({ "user": user, "maxAge": "7 days" });

        return res.json({ "status": 200, "name": user._id, "token": token });
    });
});

// curl -b cookie.txt -c cookie.txt http://localhost:3000/api/user/signout/
// router.get('/signout/', function (req, res) {

//     return res.redirect("/");
// });


module.exports = router;