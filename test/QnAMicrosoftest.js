'use strict';

var assert = require('assert');
var QnA = require('../server/integracao/QnAMicrosoftCliente');

describe('Testando QnA Microsoft', function () {
    it('Consulta básica', (done) => {
        var teste = new QnA;
        var resultado = teste.conversar("Oi")
        .then(function(resultado) {
            assert.ok(resultado != null, "Falhou");
            done();
        })
        .catch((erro) => console.log(erro));
    }).timeout(40000);
});