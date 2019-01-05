var mongodb = require('mongodb');
var Client = mongodb.MongoClient;
var url = 'mongodb://localhost:27017';

function getmongodb(collection, fn) {
    Client.connect(url, { useNewUrlParser: true }, function(err, con) {
        if (err) {
            return typeof fn == 'function' && fn(err)
        }
        var db = con.db('1610B'); //数据库
        var coll = db.collection(collection)
        typeof fn == 'function' && fn(null, con, fn)
    })
}
module.exports = {
    getmongodb: getmongodb
}