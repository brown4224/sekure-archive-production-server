
'use strict';
var express = require('express');
var app = express();
var path = require('path');
var config = require('./config')
var ldap = require('./ldap')


//http://code.runnable.com/VOd1LNZyrqxYnQES/nodejs-passport-ldapauth-express-test-for-node-js-and-hello-world
// var LdapStrategy = require('passport-ldapauth');
// IN place LDAP:  http://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/
// LDAP Module: https://github.com/vesse/passport-ldapauth
let ldapjs = require('ldapjs');
const ldapOptions = {
      url: config.ldap.url,
      connectTimeout: config.ldap.connectTimeout,
      reconnect: config.ldap.reconnect
    };

// const ldapClient = ldapjs.createClient(ldapOptions);

let authenticate = (userId, password) => {
  return new Promise((resolve, reject) => {
    const ldapClient = ldapjs.createClient(ldapOptions);

    ldapClient.bind(
      'uid=' + userId + ',' + config.ldap.domain,
      password,
      (err, res) => {
        if (err){
          return reject(err);
        }
        ldapClient.unbind();
        return resolve(res);
      }
    )
  });
}
authenticate('gauss', 'password').then(() => console.log('Succesful Auth'), (err) => console.log('Error:' + err));



// Server
var server =  require('http').Server(app);

// Paths and Ports
var port = config.express.port;
var staticFolder=config.express.staticFolder;
var staticFiles = path.join(__dirname + '/' + staticFolder);


app.use( express.static(staticFiles));
app.use((req, res) => res.sendFile(__dirname + '/' + staticFolder + '/index.html'))


var io = require('socket.io')(server);
io = io.listen(server);


//Socket.io Functions
require('./sockets.js').listen(io);

server.listen(port);
