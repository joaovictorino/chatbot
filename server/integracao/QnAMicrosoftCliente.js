'use strict';

var config = require('../../config');
var http = require('http');

function QnAMicrosoftCliente() { 
}

QnAMicrosoftCliente.prototype.conversar = function (mensagem) {
    return new Promise((resolve, reject) => {
        if (config.proxy.enabled) {
            process.env.http_proxy = config.proxy.url;
        };
        
        var demo = JSON.stringify({"question": mensagem});

        var extServerOptionsPost =
        {
            host:'westus.api.cognitive.microsoft.com',
            path:'/qnamaker/v2.0/knowledgebases/' + 'a555b866-2bda-4be5-a4c3-cfcafd9260dc' + '/generateAnswer',
            port:443,
            method:'POST',
            headers:
                {
                    'Ocp-Apim-Subscription-Key': '2eff234ceafe4cb49954748c01023a43',
                    'Content-Type':'application/json'
                }
        };

        var reqPost = http.request(extServerOptionsPost, function(res) 
        {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }

            res.setEncoding('utf8');

            req.on('socket', function (socket) {
                socket.setTimeout(40000);  
                socket.on('timeout', function() {
                    req.abort();
                });
            });
            
            var body = '';
            res.on('data', (chunk) => 
            {
                body += chunk;
            })
            .on('end', () => 
            {
                return resolve(body);
            });
        });

        reqPost.setTimeout(40000, function() {
        });

        reqPost.on('error', function(err) {
            return reject(err);
        });
        reqPost.write(demo);
        reqPost.end();
    });
}

module.exports = QnAMicrosoftCliente;