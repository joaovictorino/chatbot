var soap = require('soap');
var config = require('../../config');

function IPTUHATS() { 
    if (config.proxy.enabled) {
        process.env.http_proxy = config.proxy.url;
    }
}

IPTUHATS.prototype.consultarDebitos = function (sql) {
    return new Promise((resolve, reject) => {
        if (config.proxy.enabled) {
            process.env.http_proxy = "";
        };

        soap.createClient(config.IPTUHATS.url, function (err, client) {
            var arg = {
                arg0:
                {
                    numeroContribuinte: sql
                }
            };
            client.debitosIPTUProcessWS(arg, function (err, result) {
                return resolve(RetornarAnosExercicio(result));
            });
        });
    });

    function RetornarAnosExercicio(resultado) {
        var parcelas = [];
        var anos = [];
        var tamanhoLinha = 79;
        var retorno = resultado.return.dadosExercicioAtual;

        for (var i = 0; i < retorno.length; i+=tamanhoLinha) {
            var linha = retorno.substring(i, i+tamanhoLinha);

            if (linha.indexOf("PRESTACAO") > -1) {
                parcelas.push(linha);
            }
        }

        if(parcelas.length > 0){
            anos.push({
                anoExercicio: new Date().getFullYear(),
                parcelas: RetornarParcelas(parcelas),
                dividaAtiva: false
            });
        }

        var anosAnteriores = RetornarAnosExercicioAnteriores(resultado);

        anos.push.apply(anos, anosAnteriores);

        return { 
            codigo: 0,
            resultado: anos
        };
    }

    function RetornarAnosExercicioAnteriores(resultado) {
        var anosAnteriores = [];
        var anos = [];
        var tamanhoLinha = 79;
        var retorno = resultado.return.dadosExerciciosAnteriores;

        for (var i = 0; i < retorno.length; i+=tamanhoLinha) {
            var linha = retorno.substring(i, i+tamanhoLinha);

            if(EhNumerico(linha.substring(1, 3)) &&
                EhUmAnoFiscal(linha.substring(1, 3)) &&
                linha.substring(0, 1) == " "){
                anosAnteriores.push({
                    anoExercicio: parseInt("20" + linha.substring(1, 3)),
                    parcelas: RetornarParcelasAnteriores(linha),
                    dividaAtiva: (linha.substring(53, 79).indexOf("DIVIDA") > -1)
                });
            }
        }

        return anosAnteriores;
    }

    function RetornarParcelas(parcelas) {
        var parcelasCampos = [];

        parcelas.forEach(parcela => {
            parcelasCampos.push
            ({
                "numero": parcela.substring(14, 16),
                "vencimento": parcela.substring(33, 41),
                "valor": parseFloat(parcela.substring(53, 79).replace(".", "").replace(",", ".").trimLeft().trimRight())
            }
            );
        });

        return parcelasCampos;
    }

    function RetornarParcelasAnteriores(parcela) {
        if((parcela.substring(53, 79).indexOf("DIVIDA") == -1)){
            var parcelasCampos = [];
            
            var numeros = parcela.substring(30, 50).split(' ');

            numeros.forEach(parcela => {
                if(EhNumerico(parcela)){
                    parcelasCampos.push
                    ({
                        "numero": parcela,
                        "vencimento": "",
                        "valor": ""
                    });
                }
            });

            return parcelasCampos;
        }else{
            return null;
        }
    }

    function EhNumerico(n) {
        return !isNaN(parseInt(n)) && isFinite(n);
    }

    function EhUmAnoFiscal(n) {
        return ((n.trimLeft().trimRight().length == 2) &&
                (parseInt(n) < parseInt(new Date().getFullYear().toString().substring(2, 4))));
    }
}

module.exports = IPTUHATS