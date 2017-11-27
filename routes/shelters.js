var express = require('express');
var router = express.Router();
var moment = require('moment');

var Shelter = require('../models/shelters');
let Favorite = require('../models/favorites');
var Notification = require('../models/notifications');
var Middleware = require('../middleware');
let Geocoder = require('../libraries/geocode');

// @TODO: Move this to library
var jwt    = require('jsonwebtoken');
function getUserFromToken (req) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  return new Promise(function (resolve, reject) {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      let user;
      if (decoded && decoded._doc) user = decoded._doc;
      resolve(user);
    });
  });
}

router.get('/', function(req, res, next) {
  let query = {
    rescueGroupId: {$exists: true}
  };

  if (req.query.zipCode) {
    query['loctionDetails.zipCode'] = req.query.zipCode;
  }

  if (req.query.type) {
    query.type = req.query.type;
  }

  if (req.query.createdAtBefore) {
    if (!query.createdAt) query.createdAt = {};
    query.createdAt.$lt = moment(req.query.createdAtBefore).toISOString();
  }

  let location = '';
  if (req.query.location) {
    location = req.query.location;
  }

  if (req.query.search) {
    query.name = new RegExp(req.query.search, 'i');
  }

  Geocoder.geocode(location)
  .then(function (geocodeResult) {
    if (geocodeResult) {
      let distance = req.query.distance;
      if (distance) {
        query.locationCoords =
          { $near :
              {
                $geometry : {
                   type : "Point" ,
                   coordinates : [geocodeResult[0].longitude, geocodeResult[0].latitude], },
                $maxDistance : distance * 3959,
              }
           };
      } else {
        query['state'] = geocodeResult[0].administrativeLevels.level1short;
      }
    }

    return Shelter.find(query)
      .limit(20)
      .sort('-createdAt')
      .exec();
  })
  .then(function (favorites) {
    return res.status(200).json({data:favorites});
  })
  .catch(function (err) {
    return res.status(400).json(err);
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
