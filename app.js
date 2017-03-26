
'use strict';



var express = require('express');
var app = express();
var path = require('path');

// Server
var server =  require('http').Server(app);

// Paths and Ports
var port = 3000;
var staticFiles = path.join(__dirname + '/dist');

app.use( express.static(staticFiles));

// var socket = new io("ws://myapp-mydomain.rhcloud.com:8000/"); //NEW
var io = require('socket.io')(server);
io = io.listen(server);

// io.set('authorization', function(handshake, callback)
// {
//   return callback(null, true);
// });

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('add-message', (message) => {
    console.log("Server Recieves Message")
    console.log(message);
    io.emit('message', {type:'new-message', text: message});
  });
});


//Socket.io Functions
// require('./sockets.js').listen(io);


server.listen(port);
