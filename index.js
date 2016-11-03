var request = require('request');
var fs = require('fs');
var path = require('path');
var yauzl = require("yauzl");
var mkdirp = require('mkdirp');
var path = require('path');
var async = require('async');
var Silk = require('silk-api');
var http = require('http');
var sockjs = require('sockjs');
var express = require('express');
var app = express();
var server = http.createServer(app);
var electronApp = require('app');
var BrowserWindow = require('browser-window');
var Eureca = require('eureca.io');
var exports = require('./exports.js');

app.use(express.static(path.join(__dirname, 'public')));

var eurecaServer = new Eureca.Server({ transport: 'sockjs' });
eurecaServer.attach(server);
eurecaServer.exports = exports;

server.listen(2001, '0.0.0.0');

electronApp.on('ready', function () {
  var window = new BrowserWindow();
  window.loadUrl('http://bing.com');
});
