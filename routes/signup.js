var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/sandstorm';

/* GET home page. */
router.get('/', function(req, res, next) {
  mongodb.MongoClient.connect(url, function(err, db) {
    var users = db.collection('users');
    users.find().toArray(function (err, users) {
      res.json({ users: users });
    })
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  if(req.body.password){
    mongodb.MongoClient.connect(url, function(err, db) {
      var users = db.collection('users');
      users.insert({
        img_url: req.body.img_url,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
      }, function (err, data) {
        res.json({ data: data });
      })
    })
  }else{res.send('could not add user')};
});

router.put('/', function(req, res, next) {

  mongodb.MongoClient.connect(url, function(err, db) {
    var users = db.collection('users');
    var ID = mongodb.ObjectId(id)
    users.updateOne({_id: ID}, {$set: {
      img_url: req.body.img_url,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt),
    }}, function (err, data) {
      res.json({ data: data });
    })
  })
});

router.delete('/', function(req, res, next) {
  var id = req.params.id;
  mongodb.MongoClient.connect(url, function(err, db) {
    var users = db.collection('users');
    var ID = mongodb.ObjectId(id);
    users.remove({_id: ID}, function (err, data) {
      res.json({ data: data });
    })
  })
});

module.exports = router;
