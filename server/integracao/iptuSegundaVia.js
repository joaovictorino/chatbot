
var x2j = require( 'xml2js' );
var config = require('../../config');

function IPTU() { }

IPTU.prototype.consultarSegundaVia = function (sql, ano, nr, parcela) {
    return new Promise((resolve, reject) => {
        
        var post_options = {
            host: "www3.prefeitura.sp.gov.br",
            port: '80',
            path: '/iptusimp/index_segunda_via.html?SQL=&PAR=&ANO=&NR=',
            method: 'GET'
        };

        var post_req = http.request(post_options, function(res) {

            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            
            var body = '';
            res.on('data', (chunk) => {
                body += chunk;
              }).on('end', () => {
                console.log(body);
            });
        });
        
        post_req.on('error', function(err) {
            return reject(err);
        });

        post_req.write(requisicao);
        post_req.end();
    });
}