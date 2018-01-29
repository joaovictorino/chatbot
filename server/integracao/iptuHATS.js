var soap = require('soap');
var config = require('../../config');

function IPTUHATS() { }

IPTUHATS.prototype.consultarDebitos = function (sql) {
    return new Promise((resolve, reject) => {
        soap.createClient(config.IPTUHATS.url, function (err, client) {
            var arg = {
                arg0:
                {
                    numeroContribuinte: sql
                }
            };
            client.debitosIPTUProcessWS(arg, function (err, result) {
                return resolve(result);
            });
        });
    });
}

module.exports = IPTUHATS