
'use strict';



var express = require('express');
var app = express();
var path = require('path');

// Server
var server =  require('http').Server(app);

// Paths and Ports
var port = 3000;
var staticFolder='dist'
var staticFiles = path.join(__dirname + '/' + staticFolder);


app.use( express.static(staticFiles));
app.use((req, res) => res.sendFile(__dirname + '/' + staticFolder + '/index.html'))


var io = require('socket.io')(server);
io = io.listen(server);


//Socket.io Functions
require('./sockets.js').listen(io);


server.listen(port);
