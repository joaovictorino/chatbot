var http = require('http');
var x2j = require( 'xml2js' );
var config = require('../../config');

function IPTUSOA() { }

IPTUSOA.prototype.consultarSQLPorCEPNumero = function (cep, numero, complemento) {
    return new Promise((resolve, reject) => {
        var requisicao = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:iptu="http://prodam.sp.gov.br/financas/wsdl/iptu.v1"><soap:Header/><soap:Body><iptu:consultarImoveisPorCepUltimoSqlPesquisado.v1.0.Entrada.Mensagem><numCEP>@cep@</numCEP><numImovel>@numero@</numImovel><txtComplementoImovel>@complemento@</txtComplementoImovel></iptu:consultarImoveisPorCepUltimoSqlPesquisado.v1.0.Entrada.Mensagem></soap:Body></soap:Envelope>';
        requisicao = requisicao.replace("@cep@", cep);

        if(numero != null) {
            requisicao = requisicao.replace("@numero@", numero);
        } else {
            requisicao = requisicao.replace("<numImovel>@numero@</numImovel>", "");
        }

        if(complemento != null) {
            requisicao = requisicao.replace("@complemento@", complemento);
        } else {
            requisicao = requisicao.replace("<txtComplementoImovel>@complemento@</txtComplementoImovel>", "");
        }

        var post_options = {
            host: config.IPTUSOA.host,
            port: '80',
            path: '/financas/proxyservice/iptu.v1',
            method: 'POST',
            headers: {
                'Content-Type': 'application/soap+xml;charset=UTF-8;action="http://prodam.sp.gov.br/financas/wsdl/iptu.v1/consultarImoveisPorCepUltimoSqlPesquisado.v1.0"',
                'nomUsuarioSistema': config.IPTUSOA.username,
                'txtSenhaCAC': config.IPTUSOA.passwordCAC,
                'txtSenhaSOA': config.IPTUSOA.passwordSOA,
                'Content-Length': Buffer.byteLength(requisicao)
            }
        };

        var post_req = http.request(post_options, function(res) {

            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            res.setEncoding('utf8');
            
            var body = '';
            res.on('data', (chunk) => {
                body += chunk;
              }).on('end', () => {
                var p = new x2j.Parser();
                p.parseString(body, function( err, result ) { 
                    return resolve(montarRetorno(result, ObterFiltroConcatenado(cep, numero, complemento)));
                });
            });
        });
        
        post_req.on('error', function(err) {
            return reject(err);
        });
        post_req.write(requisicao);
        post_req.end();

        function ObterFiltroConcatenado(logradouro, numero, complemento)
        {
            return logradouro + ", " + numero + " " + complemento;
        };
    });

    function montarRetorno (result, filtro) {
        var lista = [];
        var codigoRetorno = result["soap:Envelope"]["soap:Body"][0]["iptu:consultarImoveisPorCepUltimoSqlPesquisado.v1.0.Retorno.Mensagem"][0].codRetorno[0];

        if (codigoRetorno == "0") {
            result["soap:Envelope"]["soap:Body"][0]["iptu:consultarImoveisPorCepUltimoSqlPesquisado.v1.0.Retorno.Mensagem"][0].lstNotificacaoLancamento[0]["not:NotificacaoDeLancamento"].forEach(item => {
                lista.push(
                    {
                        tipoRua: item["not:codTipoLogradouro"][0],
                        rua: item["not:nomLogradouro"][0],
                        numero: item["not:numImovel"][0],
                        complemento: item["not:txtComplementoImovel"] != undefined ? item["not:txtComplementoImovel"][0] : "",
                        sql: item["not:numSQL"][0]
                    });
            });
            
            return {
                codigo: 0,
                filtro: filtro,
                resultado: lista
            };
        } else if (codigoRetorno == "6") {
            return {
                codigo: 1,
                filtro: filtro,
                mensagem: "A consulta retornou muito resultado, favor refinar"
            };
        } else {
            return {
                codigo: 2,
                mensagem: "Erro"
            };
        }
    };
}

IPTUSOA.prototype.consultarSQLPorLogradouroNumero = function (logradouro, numero, complemento) {
    return new Promise((resolve, reject) => {
        var requisicao = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:iptu="http://prodam.sp.gov.br/financas/wsdl/iptu.v1"><soap:Header/><soap:Body><iptu:consultarImoveisPorLogradouroUltimoSqlPesquisado.v1.0.Entrada.Mensagem><nomLogradouro>@logradouro@</nomLogradouro><numImovel>@numero@</numImovel><txtComplementoImovel>@complemento@</txtComplementoImovel></iptu:consultarImoveisPorLogradouroUltimoSqlPesquisado.v1.0.Entrada.Mensagem></soap:Body></soap:Envelope>';
        requisicao = requisicao.replace("@logradouro@", logradouro);

        if(numero != null) {
            requisicao = requisicao.replace("@numero@", numero);
        } else {
            requisicao = requisicao.replace("<numImovel>@numero@</numImovel>", "");
        }

        if(complemento != null) {
            requisicao = requisicao.replace("@complemento@", complemento);
        } else {
            requisicao = requisicao.replace("<txtComplementoImovel>@complemento@</txtComplementoImovel>", "");
        }

        var post_options = {
            host: config.IPTUSOA.host,
            port: '80',
            path: '/financas/proxyservice/iptu.v1',
            method: 'POST',
            headers: {
                'Content-Type': 'application/soap+xml;charset=UTF-8;action="http://prodam.sp.gov.br/financas/wsdl/iptu.v1/consultarImoveisPorLogradouroUltimoSqlPesquisado.v1.0"',
                'nomUsuarioSistema': config.IPTUSOA.username,
                'txtSenhaCAC': config.IPTUSOA.passwordCAC,
                'txtSenhaSOA': config.IPTUSOA.passwordSOA,
                'Content-Length': Buffer.byteLength(requisicao)
            }
        };

        var post_req = http.request(post_options, function(res) {

            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            res.setEncoding('utf8');

            var body = '';
            res.on('data', (chunk) => {
                body += chunk;
              }).on('end', () => {
                var p = new x2j.Parser();
                p.parseString(body, function( err, result ) {
                    return resolve(montarRetorno(result, ObterFiltroConcatenado(logradouro, numero, complemento)));
                });
            });
        });

        post_req.on('error', function(err) {
            return reject(err);
        });
        
        post_req.write(requisicao);
        post_req.end();

        function ObterFiltroConcatenado(logradouro, numero, complemento)
        {
            return logradouro + ", " + numero + " " + complemento;
        };
    });

    function montarRetorno (result, filtro) {
        var lista = [];
        var codigoRetorno = result["soap:Envelope"]["soap:Body"][0]["iptu:consultarImoveisPorLogradouroUltimoSqlPesquisado.v1.0.Retorno.Mensagem"][0].codRetorno[0];

        if (codigoRetorno == "0") {
            result["soap:Envelope"]["soap:Body"][0]["iptu:consultarImoveisPorLogradouroUltimoSqlPesquisado.v1.0.Retorno.Mensagem"][0].lstNotificacaoLancamento[0]["not:NotificacaoDeLancamento"].forEach(item => {
                lista.push(
                    {
                        tipoRua: item["not:codTipoLogradouro"][0],
                        rua: item["not:nomLogradouro"][0],
                        numero: item["not:numImovel"][0],
                        complemento: item["not:txtComplementoImovel"] != undefined ? item["not:txtComplementoImovel"][0] : "",
                        sql: item["not:numSQL"][0]
                    });
            });
            
            return {
                codigo: 0,
                filtro: filtro,
                resultado: lista
            };
        } else if (codigoRetorno == "6") {
            return {
                codigo: 1,
                filtro: filtro,
                mensagem: "A consulta retornou muito resultado, favor refinar"
            };
        } else {
            return {
                codigo: 2,
                mensagem: "Erro"
            };
        }
    };
}

module.exports = IPTUSOA;