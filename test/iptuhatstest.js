'use strict';

var assert = require('assert');
var IPTU = require('../server/integracao/iptuHATS');

describe('Testando integrações IPTU HATS', function () {
    it('Consulta de debitos por SQL sem débitos antigos', (done) => {
        var iptu = new IPTU;
        var resultado = iptu.consultarDebitos("02904005935")
        .then(function(resultado) {
            assert.ok(resultado != null, "Falhou");
            done();
        })
        .catch((erro) => console.log(erro));
    }).timeout(4000);

    it('Consulta de debitos por SQL com débitos antigos divida ativa', (done) => {
        var iptu = new IPTU;
        var resultado = iptu.consultarDebitos("14700100019")
        .then(function(resultado) {
            assert.ok(resultado != null, "Falhou");
            done();
        })
        .catch((erro) => console.log(erro));
    }).timeout(4000);

    it('Consulta de debitos por SQL com débitos antigos', (done) => {
        var iptu = new IPTU;
        var resultado = iptu.consultarDebitos("01801400288")
        .then(function(resultado) {
            assert.ok(resultado != null, "Falhou");
            done();
        })
        .catch((erro) => console.log(erro));
    }).timeout(4000);

    it('Consulta de debitos por SQL isento', (done) => {
        var iptu = new IPTU;
        var resultado = iptu.consultarDebitos("03303006563")
        .then(function(resultado) {
            assert.ok(resultado != null, "Falhou");
            done();
        })
        .catch((erro) => console.log(erro));
    }).timeout(4000);
});