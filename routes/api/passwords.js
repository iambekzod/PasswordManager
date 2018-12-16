const express = require('express');

const db = require('../../helpers/database');
const utility = require('../../helpers/utility');
const crypto = require('../../helpers/crypto');
const constants = require('../../helpers/constants');

const validator = require('../../helpers/validator');
const passwordSchema = require('../../helpers/schemas/passwordSchema.json');
const idSchema = require('../../helpers/schemas/idSchema.json');

const router = new express.Router();

let checkId = function(req, res, next) {
    let errors = validator.assertValid(idSchema, {id: req.query.id});
    if (errors.length > 0) {
        return res.status(400).json({message: errors[0].message});
    }

    next();
};

// curl -X GET http://localhost:3000/api/passwords?id=wiopf6xS2WCQfYo5 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsidXNlcm5hbWUiOiJiZWt6b2QiLCJoYXNoIjoiZVVqY0Y0bEdRUG9aOHBheEFiWjFZNjc4VzdYN3lYalRMdkhLZnJJKzdONWpQcHM3T3lDcnZ2TThxdnM1MVBXMXNZbC8zYmtQS2VuaVI4ejZLQW9nbkE9PSIsInNhbHQiOiJ0U1ZCdVFreVY0T3hkTUd6d0V3TW1RPT0iLCJfaWQiOiJ3aW9wZjZ4UzJXQ1FmWW81IiwiY3JlYXRlZEF0IjoiMjAxOC0wOC0yM1QwMjo1Nzo1MS40ODJaIiwidXBkYXRlZEF0IjoiMjAxOC0wOC0yM1QwMjo1Nzo1MS40ODJaIn19LCJpYXQiOjE1Mzg4NjE3OTEsImV4cCI6MTUzODk0ODE5MX0.JX2M00ia91uM1tkfXIqF7sW30TUF04DsI4INL9Bydf4" -H "Content-Type: application/json"
router.get('/', utility.isAuthenticated, checkId, function(req, res) {
    if (req.user._id !== req.query.id) {
        return res.status(400).json({message: 'Invalid user id'});
    }

    db.passwords.find({
        author: req.user.username,
    }).limit(200).sort({
        createdAt: -1,
    }).exec(function(err, data) {
        if (err) return res.status(500).json({message: err});

        let filterIds = data.map(function(items) {
            return new db.Password(items);
        });

        return res.json(filterIds);
    });
});

// curl -X POST http://localhost:3000/api/passwords/ -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsidXNlcm5hbWUiOiJiZWt6b2QiLCJoYXNoIjoiZVVqY0Y0bEdRUG9aOHBheEFiWjFZNjc4VzdYN3lYalRMdkhLZnJJKzdONWpQcHM3T3lDcnZ2TThxdnM1MVBXMXNZbC8zYmtQS2VuaVI4ejZLQW9nbkE9PSIsInNhbHQiOiJ0U1ZCdVFreVY0T3hkTUd6d0V3TW1RPT0iLCJfaWQiOiJ3aW9wZjZ4UzJXQ1FmWW81IiwiY3JlYXRlZEF0IjoiMjAxOC0wOC0yM1QwMjo1Nzo1MS40ODJaIiwidXBkYXRlZEF0IjoiMjAxOC0wOC0yM1QwMjo1Nzo1MS40ODJaIn19LCJpYXQiOjE1MzUwODIyMDYsImV4cCI6MTUzNTE2ODYwNn0.C3RVfPMww-cb-fw0IcnPNs7WlrSwLnfIPXbAuFi5nhk" -H "Content-Type: application/json" -d '{"website":"111", "username":"bekzod", "password":"123", "notes":""}'
router.post('/', utility.isAuthenticated, function(req, res) {
    let errors = validator.assertValid(passwordSchema, req.body);
    if (errors.length > 0) {
        return res.status(400).json({message: errors});
    }

    let data = {
        website: req.body.website,
        username: req.body.username,
        password: req.body.password,
        notes: req.body.notes,
    };

    let requestPassword = {
        author: req.user.username,
        data: crypto.encrypt(JSON.stringify(data), constants.ENCRYPT_KEY),
    };

    db.passwords.insert(requestPassword, function(err, data) {
        if (err) return res.status(500).json({message: err});

        return res.json(new db.Password(data));
    });
});

// curl -X DELETE http://localhost:3000/api/passwords/ABDsXI7jWsb7t0hY -b cookie.txt
router.delete('/', utility.isAuthenticated, checkId, function(req, res) {
    db.passwords.findOne({
        _id: req.query.id,
    }, function(err, password) {
        if (err) return res.status(500).json({message: err});
        if (!password) {
            return res.status(404).json(
                {message: 'Password id: ' + req.query.id + ' does not exist.'});
        }
        if (password.author !== req.user.username) {
            return res.status(403).json({message: 'forbidden'});
        }

        db.passwords.remove({
            _id: password._id,
        }, function(err, item) {
            if (err) return res.status(500).json({message: err});

            return res.json(item);
        });
    });
});

router.patch('/', utility.isAuthenticated, checkId, function(req, res) {
    let errors = validator.assertValid(passwordSchema, req.body);
    if (errors.length > 0) {
        return res.status(400).json({message: errors});
    }

    db.passwords.findOne({
        _id: req.query.id,
    }, function(err, password) {
        if (err) {
            return res.status(500).json({message: err});
        }
        if (!password) {
            return res.status(404).json({message:
                'Password id: ' + req.query.id + ' does not exist.'});
        }
        if (password.author !== req.user.username) {
            return res.status(403).json({message: 'forbidden'});
        }

        let data = JSON.parse(crypto.decrypt(password.data, constants.ENCRYPT_KEY));
        if (data.website !== req.body.website) {
            return res.status(403).json({message: 'forbidden'});
        }

        if ('username' in req.body) {
            data.username = req.body.username;
        }
        if ('password' in req.body) {
            data.password = req.body.password;
        }
        if ('notes' in req.body) {
            data.notes = req.body.notes;
        }

        password.data = crypto.encrypt(JSON.stringify(data), constants.ENCRYPT_KEY);
        db.passwords.update({
            _id: password._id,
        }, {author: password.author, data: password.data}, function(err, item) {
            if (err) return res.status(500).json({message: err});

            return res.json(item);
        });
    });
});

module.exports = router;
