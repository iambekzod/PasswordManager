const Datastore = require('nedb');
const path = require('path');
const crypto = require('./crypto.js');
const constants = require('./constants.js');

var users = new Datastore({
    filename: path.join(__dirname, '../db', 'users.db'),
    autoload: true,
    timestampData: true
});

var passwords = new Datastore({
    filename: path.join(__dirname, '../db', 'passwords.db'),
    autoload: true,
    timestampData: true
});

var Password = (function () {
    return function password(data) {
        let decrypted = JSON.parse(crypto.decrypt(data.data, constants.masterKey));

        this._id = data._id;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.author = data.author;

        this.website = decrypted.website;
        this.username = decrypted.username;
        this.password = decrypted.password;
        this.notes = decrypted.notes;
    };
}());

var User = (function () {
    return function comment(data) {
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
}