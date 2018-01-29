'use strict';

var assert = require('assert');
var IPTU = require('../server/integracao/iptuHATS');

describe('Testando integrações IPTU', function () {
    it('Consulta de debitos por SQL', (done) => {
        var iptu = new IPTU;
        var resultado = iptu.consultarDebitos("02904005935")
        .then(function(resultado) {
            assert.ok(resultado != null, "Falhou");
            done();
        })
        .catch((erro) => console.log(erro));
    }).timeout(4000);
});