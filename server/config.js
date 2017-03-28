var config = {};
config.express = {};
config.aws = {};
config.aws.dynamo = {};
config.socket = {};
config.ldap = {};


//Express
config.express.url=
config.express.port=3000;
config.express.staticFolder='../dist';

//AWS
config.aws.dynamo.region = 'us-east-1';
config.aws.dynamo.files = 'Files';


//Socket.io

//LDAP CONFIG
config.ldap.url= 'ldap://ldap.forumsys.com:389';
config.ldap.connectTimeout= 30000;
config.ldap.reconnect= true;
config.ldap.domain= 'dc=example,dc=com'


module.exports=config;
