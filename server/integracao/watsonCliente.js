'use strict';

var DB = require('../dados/db');
var config = require('../../config');

var watsonIBM = require('watson-developer-cloud');

var conversation = new watsonIBM.AssistantV1({
    iam_apikey: "lip_zEC9keWaYbeojvBhfeIe-Z6poi05KUsg_NvJ3_Xc",
    version: "2018-09-20"
});

function watsonCliente() { 
}

watsonCliente.prototype.conversar = function (contexto, mensagem) {
    return new Promise((resolve, reject) => {
        if (config.proxy.enabled) {
            process.env.http_proxy = config.proxy.url;
            process.env.https_proxy = config.proxy.url;
        };
        
        if(contexto == null && mensagem == null){
            conversation.message(
                {
                    workspace_id: config.watson.workspaceId
                },
                function (err, response) {
                    if (err) {
                        return reject(err);
                    } else {             
                        return resolve(response);
                    }
                }
            );
        } else {
            conversation.message(
                {
                    context: contexto,
                    input: {
                        text: mensagem
                    },
                    workspace_id: config.watson.workspaceId
                },
                function (err, response) {
                    if (err) {
                        return reject(err);
                    } else {             
                        return resolve(response);
                    }
                }
            );
        }
    });
}

module.exports = watsonCliente;