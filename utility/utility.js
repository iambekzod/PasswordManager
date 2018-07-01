const crypto = require('crypto');
const validator = require('validator');

var isAuthenticated = function (req, res, next) {
    if (!req.user) return res.status(401).end("access denied");
    next();
};

var checkUserPass = function (req, res, next) {
    if (!('username' in req.body)) return res.status(400).end('username is missing');
    if (!('password' in req.body)) return res.status(400).end('password is missing');

    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("bad username input, must be alphanumeric");
    if (!validator.isAlphanumeric(req.body.password)) return res.status(400).end("bad password input, must be alphanumeric");
    next();
};

function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
}

function generateHash(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

module.exports = {
    isAuthenticated,
    checkUserPass,
    generateHash,
    generateSalt
}