'use strict';

var express = require('express');
var DB = require('../dados/db');
var config = require('../../config');

var router = express.Router();

process.env.http_proxy = config.proxy;

var watsonIBM = require('watson-developer-cloud');

var conversation = new watsonIBM.ConversationV1({
    username: config.watson.username,
    password: config.watson.password,
    version_date: watsonIBM.ConversationV1.VERSION_DATE_2017_05_26
});

function watsonCliente() { 
    if (config.proxy.enabled) {
        process.env.http_proxy = config.proxy.url;
    }
}

watsonCliente.prototype.conversar = function (contexto, mensagem) {
    return new Promise((resolve, reject) => {
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