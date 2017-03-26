
'use strict';



var express = require('express');
var app = express();
var path = require('path');

//
// var connect = require('connect');
// var LdapAuth = require('ldapauth');
//
// // Config from a .json or .ini file or whatever.
// var config = {
//   ldap: {
//     url: "ldap://ldap.forumsys.com:389",
//     adminDn: "cn=read-only-admin,dc=example,dc=com",
//     adminPassword: "password",
//     searchBase: "dc=example,dc=com",
//     searchFilter: "(uid={{username}})"
//   }
// };
//
// var ldap = new LdapAuth({
//   url: config.ldap.url,
//   adminDn: config.ldap.adminDn,
//   adminPassword: config.ldap.adminPassword,
//   searchBase: config.ldap.searchBase,
//   searchFilter: config.ldap.searchFilter,
//   //log4js: require('log4js'),
//   cache: true
// });
//
// var basicAuthMiddleware = connect.basicAuth(function (username, password, callback) {
//   ldap.authenticate(username, password, function (err, user) {
//     if (err) {
//       console.log("LDAP auth error: %s", err);
//     }
//     console.log('success');
//     callback(err, user)
//   });
// });
//
// basicAuthMiddleware('newton', 'password');

//http://code.runnable.com/VOd1LNZyrqxYnQES/nodejs-passport-ldapauth-express-test-for-node-js-and-hello-world
// var LdapStrategy = require('passport-ldapauth');
// IN place LDAP:  http://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/
// LDAP Module: https://github.com/vesse/passport-ldapauth
// let passport     = require('passport');
// let ldapStrategy = require('passport-ldapauth');
//
// var OPTS = {
//   server: {
//     url: 'ldap://ldap.forumsys.com:389',
//     bindDn: 'cn=read-only-admin,dc=example,dc=com',
//     bindCredentials: 'password',
//     searchBase: 'dc=example,dc=com',
//     searchFilter: '(uid={{username}})'
//   },
//   usernameField: 'username',
//   passwordField: 'password'
// };
// passport.use(new ldapStrategy(OPTS));
// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
// passport.authenticate('ldapauth', 'newton', 'password' {
//  success: console.log("success");, failure: console.console.log('error: +') + failure;};
//   passport.authenticate('ldapauth', {session: false}, function(err, user, info) {
//     if (err) {
//       console.log(err)
//       return next(err); // will generate a 500 error
//     }
//     // Generate a JSON response reflecting authentication status
//     if (! user) {
//       console.log("not a user");
//       return res.send({ success : false, message : 'authentication failed' });
//     }
//     console.log('Success');
//     // return res.send({ success : true, message : 'authentication succeeded' });
//   })(req, res, next);


//        LDAP JS

//
let ldapjs = require('ldapjs');
let config = require('./config')
const ldapOptions = {
      url: config.ldap.url,
      connectTimeout: config.ldap.connectTimeout,
      reconnect: config.ldap.reconnect
    };
const ldapClient = ldapjs.createClient(ldapOptions);

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


// var ldap = require('ldapjs');
// ldap.Attribute.setting.guid_format = ldap.GUID_FORMAT_B;
// var client = ldap.createClient({
//   url: 'ldap://ldap.forumsys.com:389/CN=read-only-admin,OU=mathematicians'
// });
// usernameField: 'newton',
// passwordField: 'password',
// server: {
// url: 'ldap://ldap.forumsys.com:389',
// adminDn: 'cn=read-only-admin,dc=example,dc=com',
// adminPassword: 'password',
// searchBase: 'dc=example,dc=com',
// searchFilter: '(uid={{username}})'
// }

// Server
var server =  require('http').Server(app);



// Paths and Ports
var port = 3000;
var staticFolder='../dist'
var staticFiles = path.join(__dirname + '/' + staticFolder);


app.use( express.static(staticFiles));
app.use((req, res) => res.sendFile(__dirname + '/' + staticFolder + '/index.html'))


var io = require('socket.io')(server);
io = io.listen(server);


//Socket.io Functions
require('./sockets.js').listen(io);


server.listen(port);
