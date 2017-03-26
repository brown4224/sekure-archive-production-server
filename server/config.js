var config = {};
//LDAP CONFIG
config.ldap = {};
config.ldap.url= 'ldap://ldap.forumsys.com:389';
config.ldap.connectTimeout= 30000;
config.ldap.reconnect= true;
config.ldap.domain= 'dc=example,dc=com'


module.exports=config;
