var config = {};

config.watson = {};
config.watson.username = '6d5a96e0-4fdf-4246-8cd7-45c5f1456347';
config.watson.password = '1BX6I0yAMvYQ';
config.watson.workspaceId = '030428d7-a6e6-4fae-9e31-34263d2d3254';

config.IPTUSOA = {};
config.IPTUSOA.host = 'osb.pp9802.prodam';
config.IPTUSOA.username = 'SF9461I';
config.IPTUSOA.passwordCAC = 'pwdSF9461I01';
config.IPTUSOA.passwordSOA = 'pwdSF9461I01';

config.IPTUHATS = {};
config.IPTUHATS.url = "http://10.10.67.177/SF5106_HATS_IPTU_WS/IPTUService/WEB-INF/wsdl/IPTUService.wsdl";

config.mongodb = {};
config.mongodb.username = "user_PRODAM";
config.mongodb.password = "PRODAM";
config.mongodb.host = "d72v20i";
config.mongodb.port = "27017";
config.mongodb.connection = () => {
    return "mongodb://" + config.mongodb.username + ":" + config.mongodb.password + "@" + config.mongodb.host + ":" + config.mongodb.port;
};

config.proxy = {};
config.proxy.url = "http://p017395:godofw@r20@10.10.190.25:3128";
config.proxy.enabled = true;

config.web = {};
config.web.port = 3000;

module.exports = config;