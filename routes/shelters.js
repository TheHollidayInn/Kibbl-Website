var express = require('express');
var router = express.Router();

var Shelter = require('../models/shelters');
var Notification = require('../models/notifications');
var Middleware = require('../middleware');

// @TODO: Move this to library
var nconf = require('nconf');
var jwt    = require('jsonwebtoken');
function getUserFromToken (req) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  return new Promise(function (resolve, reject) {
    jwt.verify(token, nconf.get('JWT_SECRET'), function(err, decoded) {
      let user;
      if (decoded && decoded._doc) user = decoded._doc;
      resolve(user);
    });
  });
}

router.get('/', function(req, res, next) {
  Shelter.find({})
  .exec(function(err, favorites) {
    if (err) return res.status(400).json(err);
    res.status(200).json({data: favorites});
  });
});

router.get('/:shelterId', function(req, res, next) {
  let pet;
  let user;
  let subscribed = false;

  getUserFromToken(req)
    .then(function (userFound) {
      user = userFound;

      let userId;
      if (user) userId = user._id;

      return  Notification.findOne({
        userID: userId,
        shelterId: req.params.shelterId,
      }).exec()
    })
    .then(function (notification) {
      if (notification && notification.active) subscribed = true;

      return Shelter.findOne({ _id: req.params.shelterId}).exec();
    })
    .then(function(favoriteFound) {
      let shelter = favoriteFound.toObject();
      if (subscribed) shelter.subscribed = true;

      return res.status(200).json({data: shelter});
    })
    .catch(function(err) {
      return res.status(400).json({message: err});
    });
});

module.exports = router;
