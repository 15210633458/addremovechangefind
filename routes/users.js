var express = require('express');
var router = express.Router();
var mongodb = require('../mongodb')
    //console.log(mongodb)
    /* GET users listing. */
    //用户的增删改查

//所有数据的渲染
router.get('/api/list', function(req, res, next) {
    mongodb.getmongodb("people", function(err, coll, con) {
        if (err) {
            return res.json({ code: 0, mes: error })
        }
        //console.log(coll)
        coll.find().toArray(function(error, result) {
            if (error) {
                res.json({ code: 0, mes: error })
            } else {
                // console.log(result)
                res.json({ code: 1, data: result })
                con.close()
            }
        })
    })
});

//增
router.post('/api/add', function(req, res, next) {
    //console.log(req.body)
    var parse = req.body,
        name = parse.name,
        age = parse.age,
        phone = parse.phone,
        add = parse.add,
        Id = parse.Id;
    mongodb.getmongodb('people', function(err, coll, con) {
        if (err) {
            res.json({ code: 0, mes: err })
        } else {
            coll.insert({ name: name, age: age, phone: phone, add: add, Id: Id }, function(error, result) {
                if (error) {
                    res.json({ code: 0, mes: error })
                } else {
                    res.json({ code: 1, mes: "添加成功" })
                }
            })
        }
    })
});

//删除
router.get('/api/remove', function(req, res, next) {
    var Id = req.query.Id;
    mongodb.getmongodb('people', function(err, coll, con) {
        if (err) {
            return res.json({ code: 0, mes: err })
        }
        coll.deleteOne({ Id: Id }, function(error, result) {
            if (error) {
                return res.json({ code: 0, mes: error })
            } else {
                res.json({ code: 1, mes: "删除成功" })
            }
        })
    })
});
module.exports = router;