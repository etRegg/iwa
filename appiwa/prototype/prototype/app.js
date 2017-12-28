var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var contacts = require('./routes/contacts');
var campagnings = require('./routes/campagnings');
var app = express();
app.use('/js', express.static('bower_components'));
app.use('/', express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/contacts', contacts);
app.use('/api/v1/campagnings', campagnings);
module.exports = app;
