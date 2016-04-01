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
var bowerStatic = require('bower_static');
var Eureca = require('eureca.io');
var exports = require('./exports.js');

bowerStatic.changeAppRoot(__dirname);
app.use('/bc', bowerStatic);
app.use(express.static(path.join(__dirname, 'public')));

var eurecaServer = new Eureca.Server({ transport: 'sockjs' });
eurecaServer.attach(server);
eurecaServer.exports = exports;

server.listen(2001, '0.0.0.0');

electronApp.on('ready', function () {
  var window = new BrowserWindow();
  window.loadUrl('http://bing.com');
});



return;

var methods = Silk.methods;
var apps = [];
var appsFolder = __dirname.split(path.sep);
appsFolder = appsFolder.slice(0, appsFolder.length - 1);
appsFolder = appsFolder.join(path.sep);

methods.add({
  "apps/remove": function (data, call_obj, send) {
    send(void(0), "Deleting...");

    var file = data.folder;
    var folder = appsFolder + path.sep + file;
    var deleteFolderRecursive = function (path) {
      if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
          var curPath = path + "/" + file;
          if (fs.lstatSync(curPath).isDirectory()) { // recurse
            deleteFolderRecursive(curPath);
          } else { // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
        console.log("Finished removing " + file);
        send(void(0), " ");
      }
    };
    deleteFolderRecursive(folder);
  },
  "apps/list": function (data, call_obj, send) {
    Silk.api.listen('apps/list', {}, function (err, data) {
      if (err) {
        return send(err);
      }
      send(void(0), data);
    });
  },
  "apps/install": startInstall
});

