const router = require('express').Router();
const db = require('../../utility/database.js');
const utility = require('../../utility/utility.js');

router.get('/', utility.isAuthenticated, function (req, res) {
    db.passwords.find({}).exec(function (err, data) {
        if (err) return res.status(500).end(err);

        var filterIds = data.map(function (items) {
            return items._id;
        });
        return res.json(filterIds);
    });
});

module.exports = router;