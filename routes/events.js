let moment = require('moment');
let express = require('express');
let router = express.Router();

let Event = require('../models/events');
let Favorite = require('../models/favorites');
let Middleware = require('../middleware');
let Geocoder = require('../libraries/geocode');

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

  if (req.query.startDate) {
    if (!query.date) query.date = {};
    query.date.$gte = moment(req.query.startDate).toISOString();
  }

  if (req.query.endDate) {
    if (!query.date) query.date = {};
    query.date.$lte = moment(req.query.endDate).toISOString();
  }

  if (req.query.createdAtBefore) {
    if (!query.createdAt) query.createdAt = {};
    query.createdAt.$lt = moment(req.query.createdAtBefore).toISOString();
  }

  let location = '';
  if (req.query.location) {
    location = req.query.location;
  }

  Geocoder.geocode(location)
  .then(function (geocodeResult) {
    if (geocodeResult) {
      query.locationCoords = {
        $near: { type: 'Point', coordinates:[geocodeResult[0].latitude, geocodeResult[0].longitude] }
      };
    }

    return Event.find(query)
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

router.get('/:eventId', function(req, res, next) {
  let pet;
  let user;
  // @TODO: Check for user status on evnet (attending, subscribed?)

  getUserFromToken(req)
    .then(function (userFound) {
      user = userFound;

      return Event.findOne({ _id: req.params.eventId}).exec()
    })
    .then(function(petFound) {
      pet = petFound;

      let userId;

      if (user) userId = user._id;

      return Favorite.findOne({
        userID: userId,
        eventId: pet._id,
      }).exec();
    })
    .then(function(favoriteFound) {
      let data = JSON.parse(JSON.stringify(pet)); // Clone variables but not functions

      data.favorited = false;

      if (favoriteFound && favoriteFound.active === true) {
        data.favorited = true;
      }

      return res.status(200).json({data: data});
    })
    .catch(function(err) {
      return res.status(400).json({message: err});
    });
});

module.exports = router;
