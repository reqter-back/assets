var express = require('express');
var cors = require('cors')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');
let apiLogger = require("./middlewares/apiLogger");

var app = express();

// Overwrite res.send
app.use(apiLogger);

app.use(compression()); //Compress all routes
app.use(helmet());
app.use(cors());

var asset = require('./routes/assets');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/asset', asset);
//app.use('/blobs', express.static('uploads'))
module.exports = app;
