var mongodb = require('mongodb');
var Client = mongodb.MongoClient;
var url = 'mongodb://localhost:27017';

function getmongodb(collection, fn) {
    Client.connect(url, { useNewUrlParser: true }, function(err, con) {
        if (err) {
            return typeof fn == 'function' && fn(err)
        }
        var db = con.db('1610Bpeople'); //数据库
        //console.log(db)
        var coll = db.collection(collection)
            //console.log(coll)
        typeof fn == 'function' && fn(null, coll, con)
    })
}
module.exports = {
    getmongodb: getmongodb
}