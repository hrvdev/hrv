/**
 * server
 */

// public modules
var express = require('express');
var path = require('path');
var http = require('http');

// self modules
var services = require('./server/services/services.js');



// create server
var app = express();

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'static')));

// 接口都在services中
for(var key in services){
  app.get('/' + key, services[key]);
}

app.listen(8888);
console.log('Server is runing at http://localhost:8888/');
