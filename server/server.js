/**
 * Created by sumeetdubey on 2/25/17.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// for client-server communication
var bodyParser    = require('body-parser');
var multer        = require('multer');
var upload = multer();

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//loading mongoose
var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/db';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect(connectionString);

// server javascript
require("./app.js")(app, mongoose);

app.listen(port, ipaddress);
