const router = require('express').Router();
const cookie = require('cookie');
const validator = require('validator');
const db = require('../../utility/database.js');
const utility = require('../../utility/utility.js');

var checkUserPass = function (req, res, next) {
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');

    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("bad username input, must be alphanumeric");
    if (!validator.isAlphanumeric(req.body.password)) return res.status(400).end("bad password input, must be alphanumeric");
    next();
};

//curl -X POST http://localhost:3000/api/user/signup -H "Content-Type: application/json" -d '{"username":"bekzod", "password":"123"}'
router.post('/signup/', checkUserPass, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    // check if user already exists in the database
    db.users.findOne({
        _id: username
    }, function (err, user) {
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("username " + username + " already exists");
        // generate a new salt and hash
        var salt = utility.generateSalt();
        var hash = utility.generateHash(password, salt);
        // insert new user into the database
        db.users.update({
            _id: username
        }, {
            _id: username,
            hash: hash,
            salt: salt
        }, {
            upsert: true
        }, function (err) {
            if (err) return res.status(500).end(err);

            return res.json("User: " + username + " signed up.");
        });
    });
});

//curl -X POST http://localhost:3000/api/user/signin -H "Content-Type: application/json" -c cookie.txt -d '{"username":"bekzod", "password":"123"}'
router.post('/signin/', checkUserPass, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    // retrieve user from the database
    db.users.findOne({
        _id: username
    }, function (err, user) {
        if (err) return res.status(500).end(err);
        if (!user) return res.status(401).end("invalid username or password");
        if (user.hash !== utility.generateHash(password, user.salt)) return res.status(401).end("invalid username or password");

        // start a session
        req.session.user = user;
        res.setHeader('Set-Cookie', cookie.serialize('username', user._id, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
        }));

        return res.json("User: " + username + " signed in.");
    });
});

// curl -b cookie.txt -c cookie.txt http://localhost:3000/api/user/signout/
router.get('/signout/', function (req, res) {
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    return res.redirect("/");
});


module.exports = router;