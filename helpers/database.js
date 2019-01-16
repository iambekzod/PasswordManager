const Datastore = require('nedb');
const path = require('path');
const crypto = require('./crypto');
const constants = require('./constants');

let users = new Datastore({
    filename: path.join(__dirname, '../db', 'users.db'),
    autoload: true,
    timestampData: true,
});

let passwords = new Datastore({
    filename: path.join(__dirname, '../db', 'passwords.db'),
    autoload: true,
    timestampData: true,
});

let Password = (function() {
    return function password(data) {
        let decrypted = JSON.parse(crypto.decrypt(data.data, constants.ENCRYPT_KEY));

        this._id = data._id;
        this.updatedAt = data.updatedAt;

        this.website = decrypted.website;
        this.username = decrypted.username;
        this.password = decrypted.password;
        this.notes = decrypted.notes;
    };
}());

let User = (function() {
    return function user(data) {
        this._id = data._id;
        this.hash = data.hash;
        this.salt = data.salt;
        this.createdAt = data.createdAt;
    };
}());

module.exports = {
    users,
    passwords,
    Password,
    User,
};
