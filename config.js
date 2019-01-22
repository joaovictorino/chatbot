var config = {};

config.watson = {};
config.watson.username = '5a041c56-b59d-4072-b233-90f7a4267000';
config.watson.password = 'lip_zEC9keWaYbeojvBhfeIe-Z6poi05KUsg_NvJ3_Xc';
config.watson.workspaceId = '06971442-8e35-4dce-8331-415499147ca0';

config.IPTUSOA = {};
config.IPTUSOA.host = 'osb.pp9802.prodam';
config.IPTUSOA.username = 'SF9461I';
config.IPTUSOA.passwordCAC = 'pwdSF9461I01';
config.IPTUSOA.passwordSOA = 'pwdSF9461I01';

config.IPTUHATS = {};
config.IPTUHATS.url = "http://10.10.67.177/SF5106_HATS_IPTU_WS/IPTUService/WEB-INF/wsdl/IPTUService.wsdl";

config.mongodb = {};
config.mongodb.host = "localhost";
config.mongodb.port = "27017";
config.mongodb.database = "it0103";
config.mongodb.connection = () => {
    return "mongodb://" + config.mongodb.host + ":" + config.mongodb.port;
};

config.proxy = {};
config.proxy.url = "http://p017395:godofw@r27@10.10.190.25:3128";
config.proxy.enabled = false;

config.web = {};
config.web.port = 3000;

module.exports = config;