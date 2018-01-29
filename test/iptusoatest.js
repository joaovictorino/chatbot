'use strict';

var assert = require('assert');
var IPTU = require('../server/integracao/iptuSOA');

describe('Testando integrações IPTU', function () {
    it('Consulta de SQL por CEP e Numero', (done) => {
        var iptu = new IPTU;
        iptu.consultarSQLPorCEPNumero("03061000", 480, null)
        .then(function(resultado) {
            assert.ok(resultado.codigo == 1, "Falhou");
            done();
        });
    }).timeout(30000);

    it('Consulta de SQL por CEP, Numero e Complemento', (done) => {
        var iptu = new IPTU;
        iptu.consultarSQLPorCEPNumero("03061000", 480, "2004")
        .then(function(resultado) {
            assert.ok(resultado.codigo == 0, "Falhou");
            done();
        });
    }).timeout(4000);

    it('Consulta de SQL por Logradouro e Numero', (done) => {
        var iptu = new IPTU;
        iptu.consultarSQLPorLogradouroNumero("toledo barbosa", 480, null)
        .then(function(resultado) {
            assert.ok(resultado.codigo == 1, "Falhou");
            done();
        });
    });

    it('Consulta de SQL por Logradouro, Numero e Complemento', (done) => {
        var iptu = new IPTU;
        iptu.consultarSQLPorLogradouroNumero("toledo barbosa", 480, "2004")
        .then(function(resultado) {
            assert.ok(resultado.codigo == 0, "Falhou");
            done();
        });
    });
});