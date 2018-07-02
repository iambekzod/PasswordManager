const router = require('express').Router();
const db = require('../../utility/database.js');
const utility = require('../../utility/utility.js');
const validator = require('validator');
const crypto = require('../../utility/crypto.js');
const constants = require('../../utility/constants.js');

var sanitizeInput = function (req, res, next) {
    if (!('website' in req.body)) return res.status(400).end('website is missing');
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');
    if (!('notes' in req.body)) return res.status(400).end('notes is missing');

    req.body.website = validator.escape(req.body.website);
    req.body.username = validator.escape(req.body.username);
    req.body.password = validator.escape(req.body.password);
    req.body.notes = validator.escape(req.body.notes);
    next();
};

router.get('/', utility.isAuthenticated, function (req, res) {
    db.passwords.find({}).exec(function (err, data) {
        if (err) return res.status(500).end(err);

        var filterIds = data.map(function (items) {
            return items._id;
        });
        return res.json(filterIds);
    });
});

//curl -X POST http://localhost:3000/api/passwords/ -b cookie.txt -H "Content-Type: application/json" -d '{"website":"111", "username":"bekzod", "password":"123", "notes":""}'
router.post('/', utility.isAuthenticated, sanitizeInput, function (req, res) {
    var data = {
        author: req.user._id,
        website: req.body.website,
        username: req.body.username,
        password: req.body.password,
        notes: req.body.notes
    };

    var requestPassword = { data: crypto.encrypt(JSON.stringify(data), constants.masterKey) };

    db.passwords.insert(requestPassword, function (err, data) {
        if (err) return res.status(500).end(err);
        
        return res.json(new db.Password(data));
    });
});

module.exports = router;