const crypto = require('crypto');

var isAuthenticated = function (req, res, next) {
    if (!req.user) return res.status(401).end("access denied");
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
    generateHash,
    generateSalt
}