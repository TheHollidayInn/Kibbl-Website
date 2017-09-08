let express = require('express');
let router = express.Router();
let moment = require('moment');

let Pets = require('../models/pets');
let Favorite = require('../models/favorites');
let Notification = require('../models/notifications');
let Geocoder = require('../libraries/geocode');

let Middleware = require('../middleware');
let _ = require('lodash');

// @TODO: Move this to library
let nconf = require('nconf');
let jwt    = require('jsonwebtoken');

let prerender = require('prerender-node').set('prerenderToken', nconf.get('PRERENDER_TOKEN'))

function getUserFromToken (req) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  return new Promise(function (resolve, reject) {
    jwt.verify(token, nconf.get('JWT_SECRET'), function(err, decoded) {
      let user;
      if (decoded && decoded._doc) user = decoded._doc;
      resolve(user);
    });
  });
}

router.get('/', function(req, res, next) {
  let limit = 20;
  let offset = 0;

  let query = {
    // rescueGroupId: {$exists: true}
  };

  if (req.query.type) {
    query.animal = req.query.type;
  }

  if (req.query.breed) {
    query.breeds = {};
    query.breeds = req.query.breed;
  }

  if (req.query.age) {
    query.age = req.query.age;
  }

  if (req.query.gender) {
    query.sex = req.query.gender;
  }

  if (req.query.zipCode) {
    query['contact.zip'] = req.query.zipCode;
  }

  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  if (req.query.lastUpdatedBefore) {
    if (!query.lastUpdate) query.lastUpdate = {};
    query.lastUpdate.$lt = moment(req.query.lastUpdatedBefore).toDate();
  }

  let location = '';
  if (req.query.location) {
    location = req.query.location;
  }

  if (req.query.shelterId) {
    query.shelterId = req.query.shelterId;
  }

  if (req.query.search) {
    query.name = new RegExp(req.query.search, 'i');
  }

  let pets = [];
  let fields = 'contact age size media breeds name sex description lastUpdate animal rescueGroupId';
  let user = req.user;

  getUserFromToken(req)
  .then(function (userFound) {
    user = userFound;
    return Geocoder.geocode(location)
  })
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
        query['contact.state'] = geocodeResult[0].administrativeLevels.level1short;
      }
    }

    return Pets.find(query, fields)
      .limit(limit)
      .sort('-lastUpdate').exec()
  })
  .then (function (petsFound) {
    pets = petsFound;
    let petIds = _.map(pets, '_id');
    let favoriteQuery = {
      petID: {$in: petIds}
    };

    if (user) favoriteQuery.userID = user._id;

    return Favorite.find(favoriteQuery).exec();
  })
  .then (function (favorites) {
    let favoritesHashedByPetId = _.keyBy(favorites, 'petID');
    pets = _(pets).forEach((data) => {
      if (favoritesHashedByPetId[data._id] && favoritesHashedByPetId[data._id].active) {
        data.userFavorited = true;
      }

      // @TODO: We add these fields manually to perserve the Android Retrofit model.
      // Eventually we should update Android to handle incomplete model responses
      if (!data.status) data.status = '';
      if (!data.age) data.age = '';
      if (!data.size) data.size = '';
      if (!data.petId) data.petId = '';
      if (!data.shelterPetId) data.shelterPetId = '';
      if (!data.rescueGroupId) data.rescueGroupId = '';
      if (!data.sex) data.sex = '';
      if (!data.lastUpdate) data.lastUpdate = '';
      if (!data.animal) data.animal = '';
      if (!data.favorited) data.favorited = false;
      if (!data.name) data.name = '';
      if (!data.breeds) data.breeds = [];
      if (!data.contact) {
        data.contact = {
          phone: '',
          state: '',
          address2: '',
          email: '',
          zip: '',
          fax: '',
          address1: ''
        };
      }
    });

    return Pets.count().exec();
  })
  .then(function(count) {
    let responseData = {
      total: count,
      pets: pets,
    };
    return res.status(200).json(responseData);
  })
  .catch(function (err) {
    console.log(err)
    return res.status(400).json(err);
  });

});

router.get('/:petId', prerender, function(req, res, next) {
  let pet;
  let user;
  let data;

  getUserFromToken(req)
    .then(function (userFound) {
      user = userFound;

      let fields = 'contact age size media breeds name sex description lastUpdate animal rescueGroupId shelterId';
      return Pets
      .findOne({ _id: req.params.petId}, fields)
        .populate('shelterId')
        .exec();
    })
    .then(function(petFound) {
      pet = petFound;

      let userId;
      if (user) userId = user._id;

      return Favorite.findOne({
        userID: userId,
        petID: pet._id,
      }).exec();
    })
    .then(function(favoriteFound) {
      data = JSON.parse(JSON.stringify(pet)); // Clone letiables but not functions

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

      // @TODO: We add these fields manually to perserve the Android Retrofit model.
      // Eventually we should update Android to handle incomplete model responses
      if (!data.status) data.status = '';
      if (!data.age) data.age = '';
      if (!data.size) data.size = '';
      if (!data.petId) data.petId = '';
      if (!data.shelterPetId) data.shelterPetId = '';
      if (!data.rescueGroupId) data.rescueGroupId = '';
      if (!data.sex) data.sex = '';
      if (!data.lastUpdate) data.lastUpdate = '';
      if (!data.animal) data.animal = '';
      if (!data.favorited) data.favorited = false;
      if (!data.name) data.name = '';
      if (!data.breeds) data.breeds = [];
      if (!data.contact) {
        data.contact = {
          phone: '',
          state: '',
          address2: '',
          email: '',
          zip: '',
          fax: '',
          address1: ''
        };
      }

      return res.status(200).json({data});
    })
    .catch(function(err) {
      return res.status(400).json({message: err});
    });
});

router.post('/:petId/favorite', Middleware.hasValidToken, function(req, res, next) {
  Favorite.find({
    userID: req.user._id,
    petID: req.params.petId,
  }).exec()
  .then(function(favorites) {
    if (favorites[0]) {
      if (favorites[0].active) {
        favorites[0].active = false;
      } else {
        favorites[0].active = true;
      }
      return favorites[0].save();
    } else {
      let fav = new Favorite();
      fav.userID = req.user._id;
      fav.petID = req.params.petId;

      return fav.save();
    }
  })
  .then(function(fav) {
    return res.status(200).json({data: fav});
  })
  .catch(function (err) {
    if (err) return res.status(400).json(err);
  });
});

module.exports = router;
