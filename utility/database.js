const Datastore = require('nedb');
const path = require('path');
const fs = require('fs');

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
    return function image(data) {
        this._id = data._id;
        this.owner = data.owner;
        this.website = data.website;
        this.username = data.username;
        this.password = data.password;
        this.notes = data.notes;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    };
}());

var User = (function () {
    return function comment(data) {
        this._id = data._id;
        this.hash = data.hash;
        this.salt = data.salt;
        this.createdAt = savedComment.createdAt;
    };
}());

module.exports = {
    users,
    passwords,
    Password,
    User,
}