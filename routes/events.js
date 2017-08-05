let moment = require('moment');
let express = require('express');
let router = express.Router();

let Event = require('../models/events');
let Favorite = require('../models/favorites');
let Middleware = require('../middleware');
var Notification = require('../models/notifications');
let Geocoder = require('../libraries/geocode');

// @TODO: Move this to library
var nconf = require('nconf');
var jwt    = require('jsonwebtoken');

let prerender = require('prerender-node').set('prerenderToken', nconf.get('PRERENDER_TOKEN'))

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
  query.start_time = {
    $gt: moment().toISOString(),
  };

  if (req.query.zipCode) {
    query['loctionDetails.zipCode'] = req.query.zipCode;
  }

  if (req.query.type) {
    query.type = req.query.type;
  }

  if (req.query.startDate) {
    if (!query.start_time) query.start_time = {};
    query.start_time.$gte = moment(req.query.startDate).toISOString();
  }

  if (req.query.endDate) {
    if (!query.start_time) query.start_time = {};
    query.start_time.$lte = moment(req.query.endDate).toISOString();
  }

  if (req.query.search) {
    query.name = new RegExp(req.query.search, 'i');
  }

  // if (req.query.createdAtBefore) {
  //   if (!query.createdAt) query.createdAt = {};
  //   query.createdAt.$lt = moment(req.query.createdAtBefore).toISOString();
  // }

  let createdAtBeforeAfterStart = !Boolean(req.query.createdAtBefore) || moment(req.query.createdAtBefore).isAfter(req.query.startDate);
  let createdAtBeforeBeforeEnd = !Boolean(req.query.endDate) || moment(req.query.createdAtBefore).isBefore(req.query.endDate);

  if (req.query.createdAtBefore && createdAtBeforeAfterStart && createdAtBeforeBeforeEnd) {
    if (!query.start_time) query.start_time = {};
    if (query.start_time.$gte) delete query.start_time.$gte;
    query.start_time.$gt = moment(req.query.createdAtBefore).toISOString();
  }

  let location = '';
  if (req.query.location) {
    location = req.query.location;
  }

  if (req.query.shelterId) {
    query.shelterId = req.query.shelterId;
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
        query['place.location.state'] = geocodeResult[0].administrativeLevels.level1short;
      }
    }

    return Event.find(query)
      .populate('shelterId')
      .limit(20)
      .sort('start_time')
      .exec();
  })
  .then(function (favorites) {
    let events = [];
    favorites.forEach((event) => {
      let newEvent = JSON.parse(JSON.stringify(event));
      newEvent.locationCoords = {
        coordinates: [0, 0],
        "type": "Point"
      };
      if (newEvent.shelterId && newEvent.shelterId._id) {
        newEvent.shelterId.locationCoords = {
          coordinates: [0, 0],
          "type": "Point"
        };
      }

      events.push(newEvent);
    })

    return res.status(200).json({data: events});
  })
  .catch(function (err) {
    return res.status(400).json(err);
  });
});

router.get('/:eventId', prerender, function(req, res, next) {
  let pet;
  let user;
  let data;
  // @TODO: Check for user status on evnet (attending, subscribed?)

  getUserFromToken(req)
    .then(function (userFound) {
      user = userFound;

      return Event.findOne({ _id: req.params.eventId}).populate('shelterId').exec()
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
      data = JSON.parse(JSON.stringify(pet)); // Clone variables but not functions

      data.favorited = false;

      if (favoriteFound && favoriteFound.active === true) {
        data.favorited = true;
      }

      if (user && data.shelterId && data.shelterId._id) {
        return Notification.findOne({
          userID: user._id,
          shelterId: data.shelterId._id,
        }).exec()
      }

      return null;
    })
    .then((notification) => {
      let subscribed = false;

      if (notification && notification.active) subscribed = true;

      if (subscribed) data.subscribed = true;

      data.locationCoords = {
        coordinates: [0, 0],
        "type": "Point"
      };
      if (data.shelterId && data.shelterId._id) {
        data.shelterId.locationCoords = {
          coordinates: [0, 0],
          "type": "Point"
        };
      }

      return res.status(200).json({data: data});
    })
    .catch(function(err) {
      return res.status(400).json({message: err});
    });
});

module.exports = router;
