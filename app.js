///////////////////////////////////////////////////////
// Imports
///////////////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookie = require('cookie');

///////////////////////////////////////////////////////
// Initialization
///////////////////////////////////////////////////////
const PORT = 3000;
const app = express();

///////////////////////////////////////////////////////
// Middleware
///////////////////////////////////////////////////////
if (app.get('env') == 'production') {
    console.log("Launched with production settings");
    app.use(morgan('combined', {
        skip: function (req, res) {
            return res.statusCode < 400;
        }
    }));
} else {
    app.use(morgan('dev'));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}
app.use(express.static('client/dist/PasswordManager'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log("HTTP server on http://localhost:%s", PORT);
});