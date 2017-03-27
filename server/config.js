var config = {};

//Express
config.express = {};
config.express.url=
config.express.port=3000;
config.express.staticFolder='../dist';

//Socket.io
config.socket = {};

//LDAP CONFIG
config.ldap = {};
config.ldap.url= 'ldap://ldap.forumsys.com:389';
config.ldap.connectTimeout= 30000;
config.ldap.reconnect= true;
config.ldap.domain= 'dc=example,dc=com'


module.exports=config;
