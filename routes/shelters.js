var express = require('express');
var router = express.Router();

var Shelter = require('../models/shelters');
let Favorite = require('../models/favorites');
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
  let query = {};

  if (req.query.zipCode) {
    query['loctionDetails.zipCode'] = req.query.zipCode;
  }

  if (req.query.type) {
    query.type = req.query.type;
  }

  Shelter.find(query)
  .exec(function(err, favorites) {
    if (err) return res.status(400).json(err);
    res.status(200).json({data: favorites});
  });
});

router.get('/:shelterId', function(req, res, next) {
  let pet;
  let user;
  let userId;
  let subscribed = false;
  let favorited = false;

  getUserFromToken(req)
    .then(function (userFound) {
      user = userFound;

      if (user) userId = user._id;

      return Notification.findOne({
        userID: userId,
        shelterId: req.params.shelterId,
      }).exec()
    })
    .then(function (notification) {
      if (notification && notification.active) subscribed = true;

      return Favorite.findOne({
        userID: userId,
        shelterId: req.params.shelterId,
      }).exec();
    })
    .then(function (favorite) {
      if (favorite && favorite.active) favorited = true;

      return Shelter.findOne({ _id: req.params.shelterId}).exec();
    })
    .then(function(shelterFound) {
      let shelter = shelterFound.toObject();
      if (subscribed) shelter.subscribed = true;
      if (favorited) shelter.favorited = true;

      return res.status(200).json({data: shelter});
    })
    .catch(function(err) {
      console.log(err)
      return res.status(400).json({message: err});
    });
});

module.exports = router;
