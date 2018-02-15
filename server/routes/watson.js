'use strict';

var express = require('express');
var DB = require('../dados/db');
var config = require('../../config');
var watsonCliente = require('../integracao/watsonCliente');

var router = express.Router();

router.get('/Ola', function (req, res) {
    var dao = new DB;
    var watson = new watsonCliente;

    watson.conversar(null, null).
        then(function(response) {
            dao.salvarOla(config.mongodb.connection(), response.context.conversation_id, response.output.text[0]);
            res.send({ retorno: response.output, contexto: response.context });
        })
        .catch((erro) => console.error(erro));
});

router.post('/Conversar', function (req, res) {
    var dao = new DB;
    var watson = new watsonCliente;
    var timeIndo = new Date();
    dao.salvarConversa(config.mongodb.connection(), req.body.contexto.conversation_id, req.body.msg, null, timeIndo);

    watson.conversar(req.body.contexto, req.body.msg).
        then(function(response) {
            var timeVindo = new Date();
            dao.salvarConversa(config.mongodb.connection(), response.context.conversation_id, response.output.text[0], ConverterIntencao(response.intents), timeVindo);
            res.send({ retorno: response.output, contexto: response.context });
        })
        .catch((erro) => console.error(erro));

    function ConverterIntencao(intencoesIngles) {
        var intencoesPortugues = [];

        intencoesIngles.forEach(intencao => {
            intencoesPortugues.push({
                    "intencao" : intencao.intent,
                    "confianca" : intencao.confidence
                });
        });

        return intencoesPortugues;
    };

}); 

module.exports = router;