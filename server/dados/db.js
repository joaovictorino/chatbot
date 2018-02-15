var MongoClient = require('mongodb').MongoClient;
var config = require('../../config');

function DB() { }

DB.prototype.salvarOla = function (url, id, mensagem) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(config.mongodb.database);
        var time = new Date();
        var myobj = { _id: id, data: time, interacoes: [{ mensagem: mensagem, data: time }] };
        dbo.collection("conversations").insertOne(myobj, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });
}

DB.prototype.salvarConversa = function (url, id, mensagem, intencoes, dataHora) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(config.mongodb.database);
        var myobj = { _id: id };
        dbo.collection("conversations").findOne(myobj, function (err, res) {
            if (err) throw err;

            if (intencoes != null) {
                res.interacoes.push({ mensagem: mensagem, data: dataHora, intencoes: intencoes });
            } else {
                res.interacoes.push({ mensagem: mensagem, data: dataHora });
            }    

            dbo.collection("conversations").update({ _id: res._id }, res, function (err, res) {
                if (err) throw err;
                db.close();
            });
        });
    });
}

module.exports = DB;