const crypto = require('crypto');
const constants = require('./constants');
const jwt = require('jsonwebtoken');

/**
 * Check if user is authenticated by checking jwt token
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next function in route
 * @return {Promise} Resolve the token is authenticated
 */
function isAuthenticated(req, res, next) {
    if (req.headers.authorization.indexOf('Bearer') === -1) {
        return res.status(400).json({message: 'Invalid auth header'});
    }

    let token = req.headers.authorization.split('Bearer')[1].trim();

    return verifyJWTToken(token).then(function(resolve) {
        req.user = resolve.data.user;
        next();
    }).catch(function(err) {
        return res.status(400).json({message: err.message});
    });
}

/** Return a randomly generated string encoded in base64
 * @return {string} Randomly generated string encoded in base64
 */
function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
}

/**
 * Generate a hashed password with sha512 + salt
 * @param {string} password Password to hash
 * @param {string} salt Salt to append
 * @return {string} Base64 hashed password in sha512 + salt
 */
function generateHash(password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

/**
 * Create a JWT token that expires every 7 days
 * @param {*} details Body of the token
 * @return {string} return a jwt token
 */
function createJWTToken(details) {
    details = details || {};

    let token = jwt.sign({
        data: details,
       }, constants.JWT_SECRET, {
         expiresIn: constants.MAX_AGE,
         algorithm: 'HS256',
     });

     return token;
}

/** Verify the jwt token in the request
 * @param {string} token The jwt token
 * @return {Promise} Promise that resolves to the verified token
 */
function verifyJWTToken(token) {
    return new Promise(function(resolve, reject) {
        jwt.verify(token, constants.JWT_SECRET, function(err, token) {
            if (err || !token) {
                return reject(err);
            }

            resolve(token);
        });
    });
}

module.exports = {
    isAuthenticated: isAuthenticated,
    generateHash: generateHash,
    generateSalt: generateSalt,
    createJWTToken: createJWTToken,
};
