///////////////////////////////////////////////////////
// Imports
///////////////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const session = require('express-session');
const constants = require ('./utility/constants');
const utility = require('./utility/utility');
const db = require('./utility/database');
///////////////////////////////////////////////////////
// Initialization
///////////////////////////////////////////////////////
const PORT = 3000;
const app = express();

///////////////////////////////////////////////////////
// Middleware
///////////////////////////////////////////////////////
if (app.get('env') == 'production') {
    app.use(morgan('combined', {
        skip: function (req, res) {
            return res.statusCode < 400;
        }
    }));
} else {
    app.use(morgan('dev'));
}
//app.use(express.static('client'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: constants.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: true
    }
}));

app.use(function (req, res, next) {
    req.user = ('user' in req.session) ? req.session.user : null;
    var username = (req.user) ? req.user._id : '';
    res.setHeader('Set-Cookie', cookie.serialize('username', username, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));

    next();
});

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log("HTTP server on http://localhost:%s", PORT);
});