const express = require('express');

const db = require('../../helpers/database.js');
const utility = require('../../helpers/utility.js');
const crypto = require('../../helpers/crypto.js');
const constants = require('../../helpers/constants.js');

const router = new express.Router();

let sanitizePostInput = function(req, res, next) {
    if (!('website' in req.body)) {
        return res.status(400).json({'error': 'website is missing'});
    }
    if (!('username' in req.body)) {
        return res.status(400).json({'error': 'username is missing'});
    }
    if (!('password' in req.body)) {
        return res.status(400).json({'error': 'password is missing'});
    }
    if (!('notes' in req.body)) {
        return res.status(400).json({'error': 'notes is missing'});
    }

    req.body.website = validator.escape(req.body.website);
    req.body.username = validator.escape(req.body.username);
    req.body.password = validator.escape(req.body.password);
    req.body.notes = validator.escape(req.body.notes);
    next();
};

let sanitizePatchInput = function(req, res, next) {
    if ('website' in req.body) {
        req.body.website = validator.escape(req.body.website);
    }
    if ('username' in req.body) {
        req.body.username = validator.escape(req.body.username);
    }
    if ('password' in req.body) {
        req.body.password = validator.escape(req.body.password);
    }
    if ('notes' in req.body) {
        req.body.notes = validator.escape(req.body.notes);
    }

    next();
};

let checkId = function(req, res, next) {
    if (!validator.isAlphanumeric(req.params.id)) {
        return res.status(400).json({'error': 'id must be alphanumeric'});
    }

    next();
};

router.get('/:id/', utility.isAuthenticated, checkId, function(req, res) {
    db.passwords.find({
        author: req.params.id,
    }).sort({
        createdAt: -1,
    }).exec(function(err, data) {
        if (err) return res.status(500).end(err);

        let filterIds = data.map(function(items) {
            return new db.Password(items);
        });

        return res.json(filterIds);
    });
});

// curl -X POST http://localhost:3000/api/passwords/ -b cookie.txt -H "Content-Type: application/json" -d '{"website":"111", "username":"bekzod", "password":"123", "notes":""}'
router.post('/', utility.isAuthenticated, sanitizePostInput, function(req, res) {
    let data = {
        website: req.body.website,
        username: req.body.username,
        password: req.body.password,
        notes: req.body.notes,
    };

    let requestPassword = {
        author: req.user._id,
        data: crypto.encrypt(JSON.stringify(data), constants.masterKey),
    };

    db.passwords.insert(requestPassword, function(err, data) {
        if (err) return res.status(500).end(err);

        return res.json(new db.Password(data));
    });
});

// curl -X DELETE http://localhost:3000/api/passwords/ABDsXI7jWsb7t0hY -b cookie.txt
router.delete('/:id/', utility.isAuthenticated, checkId, function(req, res) {
    db.passwords.findOne({
        _id: req.params.id,
    }, function(err, password) {
        if (err) return res.status(500).end(err);
        if (!password) {
            return res.status(404).json(
                {'error': 'Password id: ' + req.params.id + ' does not exist.'});
        }
        if (password.author !== req.user._id) return res.status(403).json({'error': 'forbidden'});

        db.passwords.remove({
            _id: password._id,
        }, function(err, item) {
            if (err) return res.status(500).end(err);

            return res.json(item);
        });
    });
});

router.patch('/:id/', utility.isAuthenticated, checkId, sanitizePatchInput, function(req, res) {
    db.passwords.findOne({
        _id: req.params.id,
    }, function(err, password) {
        if (err) {
            return res.status(500).end(err);
        }
        if (!password) {
            return res.status(404).json({'error':
                'Password id: ' + req.params.id + ' does not exist.'});
        }
        if (password.author !== req.user._id) {
            return res.status(403).json({'error': 'forbidden'});
        }

        let data = JSON.parse(crypto.decrypt(password.data, constants.masterKey));
        if ('website' in req.body) {
            data.website = req.body.website;
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

        password.data = crypto.encrypt(JSON.stringify(data), constants.masterKey);
        db.passwords.update({
            _id: password._id,
        }, {author: password.author, data: password.data}, function(err, item) {
            if (err) return res.status(500).end(err);

            return res.json(item);
        });
    });
});

module.exports = router;
