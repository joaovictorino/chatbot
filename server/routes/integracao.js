'use strict';

var express = require('express');
var router = express.Router();
var IPTU = require('../integracao/iptuSOA');
var config = require('../../config');

router.post('/Integrar', function (req, res) {
    if(req.body.action == "consultaSQLpeloEndereco") {
        var iptu = new IPTU;
        iptu.consultarSQLPorLogradouroNumero(req.body.contexto.endereco, req.body.contexto.numero, req.body.contexto.complemento)
        .then(function(resultado) {
            res.send(resultado);
        })
        .catch((erro) => res.send(erro));
    } else if(req.body.action == "consultaSQLpeloCep") {
        var iptu = new IPTU;
        iptu.consultarSQLPorCEPNumero(req.body.contexto.cep, req.body.contexto.numero, req.body.contexto.complemento)
        .then(function(resultado) {
            res.send(resultado);
        })
        .catch((erro) => res.send(erro));
    }
});

module.exports = router;