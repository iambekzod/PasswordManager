var router = require('express').Router();

router.use('/api', require('./api'));

router.use(function (req, res, next) {
    res.status(501).end("Invalid API endpoint: " + req.url);
    console.log("HTTP Response", res.statusCode);
});

module.exports = router;