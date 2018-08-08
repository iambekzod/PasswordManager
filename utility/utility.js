const crypto = require('crypto');
const constants = require('./constants.js');
const jwt = require('jsonwebtoken');

var isAuthenticated = function (req, res, next) {
    return new Promise((resolve, reject) =>
    {
      jwt.verify(token, constants.JWT_SECRET, (err, decodedToken) => 
      {
        if (err || !decodedToken)
        {
          return reject(err);
        }
  
        resolve(decodedToken)
      });
    });
};

function generateSalt() {
    return crypto.randomBytes(16).toString('base64');
}

function generateHash(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

function createJWTToken(details) {
    details = details || {};

    var token = jwt.sign({
        data: details
       }, constants.JWT_SECRET, {
         expiresIn: details.maxAge,
         algorithm: 'HS256'
     });
   
     return token;
}

module.exports = {
    isAuthenticated,
    generateHash,
    generateSalt,
    createJWTToken
}