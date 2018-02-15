'use strict';

var express = require('express');
var router = express.Router();
var IPTUSOA = require('../integracao/iptuSOA');
var IPTU = require('../integracao/iptuHATS');
var config = require('../../config');

router.post('/Integrar', function (req, res) {
    var iptu = new IPTUSOA;
    var debitos = new IPTU;
    var filtro = null;
    if(req.body.action == "consultaSQLpeloEndereco") {
        filtro = ObterFiltroConcatenado(req.body.contexto.endereco, req.body.contexto.numero, req.body.contexto.complemento);
        iptu.consultarSQLPorLogradouroNumero(tratarEndereco(req.body.contexto.endereco), req.body.contexto.numero, tratarComplemento(req.body.contexto.complemento))
        .then(function(resultado) {
            resultado.filtro = filtro;
            res.send(resultado);
        })
        .catch((erro) => res.send(erro));
    } else if(req.body.action == "consultaSQLpeloCep") {
        filtro = ObterFiltroConcatenado(req.body.contexto.cep, req.body.contexto.numero, req.body.contexto.complemento);
        iptu.consultarSQLPorCEPNumero(tratarCEP(req.body.contexto.cep), req.body.contexto.numero, tratarComplemento(req.body.contexto.complemento))
        .then(function(resultado) {
            resultado.filtro = filtro;
            res.send(resultado);
        })
        .catch((erro) => res.send(erro));
    } else if(req.body.action == "consultaDebitos") {
        debitos.consultarDebitos(formatarSQL(req.body.contexto))
        .then(function(resultado) {
            res.send(resultado);
        })
        .catch((erro) => res.send(erro));
    } else {
        res.send("Erro");
    };

    function formatarSQL(sql) {
        if(sql != null){
            var sqlLimpo = sql.replace(".", "").replace("-", "").trimLeft().trimRight();
            if(sqlLimpo.length < 11){
                var pad = "00000000000";
                return pad.substring(0, pad.length - sqlLimpo.length) + sqlLimpo;
            }
            return sqlLimpo;
        }else{
            return sql;
        }
    };

    function tratarComplemento(complemento) {
        if(complemento != "") {
            if(complemento.toLowerCase().indexOf("não") > -1 ||
            complemento.toLowerCase().indexOf("nao ") > -1  ||
            complemento.toLowerCase().indexOf(" nao") > -1) {
                return null;
            } else {
                var retorno = complemento.toLowerCase()
                                .replace('apto', '')
                                .replace('casa', '')
                                .replace('bloco', '')
                                .replace('-', '')
                                .replace('.', '')
                                .trimLeft()
                                .trimRight();

                if(retorno == "") {
                    return null;
                } else {
                    return retorno;
                }
            }
        } else {
            return null;
        }
    };

    function tratarEndereco(endereco) {
        if(endereco != "") {
            return endereco.toLowerCase()
                        .replace('.', '')
                        .replace('rua', '')
                        .replace('r ', '')
                        .replace('alamenda', '')
                        .replace('avenida', '')
                        .replace('av ', '')
                        .trimLeft()
                        .trimRight();
        } else {
            return null;
        }
    };

    function tratarCEP(cep) {
        if(cep != "") {
            return cep.replace('-', '')
                        .trimLeft()
                        .trimRight();
        } else {
            return null;
        }
    };

    function ObterFiltroConcatenado(logradouro, numero, complemento)
    {
        return logradouro + ", " + numero + " " + complemento;
    };
});

module.exports = router;