const router = require('express').Router();
const db = require('../../utility/database.js');
const utility = require('../../utility/utility.js');

//curl -X POST http://localhost:3000/api/user/signup -H "Content-Type: application/json" -d '{"username":word":"123"}'
router.post('/signup/', utility.checkUserPass, function (req, res, next) {
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

module.exports = router;