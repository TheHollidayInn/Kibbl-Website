var express = require('express');
var router = express.Router();

var Pets = require('../models/pets');
var Favorite = require('../models/favorites');

var Middleware = require('../middleware');
var _ = require('lodash');

router.get('/', function(req, res, next) {
  var limit = 100;
  var offset = 0;

  var query = {};

  // if (req.query.location) {
  //   query.location = {t: req.query.location};
  // }

  if (req.query.type) {
    query.animal = {t: req.query.type};
  }

  // if (req.query.breed) {
  //   query.breeds = {};
  //   query.breeds.breed = {'$elemMatch': [{t: req.query.breed}]};
  // }

  if (req.query.age) {
    query.age = {t: req.query.age};
  }

  if (req.query.gender) {
    query.sex = {t: req.query.gender};
  }

  if (req.query.offset) {
    offset = parseInt(req.query.offset);
  }

  var pets = [];

  Pets.find(query)
  .skip(offset)
  .limit(limit)
  .then (function (petsFound) {
    pets = petsFound;

    if (!req.user) {
      throw new Error('User Not Logged In.');
      return res.status(200).json({
        total: pets.length,
        pets: pets,
      });
    }

    var petIds = _.map(pets, '_id');
    return Favorite.find({
      userID: req.user._id,
      petID: {$in: petIds}
    }).exec();
  })
  .then (function (favorites) {
    var favoritesHashedByPetId = _.keyBy(favorites, 'petID');

    pets = _(pets).forEach(function(pet) {
      if (favoritesHashedByPetId[pet._id] && favoritesHashedByPetId[pet._id].active) {
        pet.userFavorited = true;
      }
    });

    return Pets.count().exec();
  })
  .then(function(count) {
    var responseData = {
      total: count,
      pets: pets,
    };
    return res.status(200).json(responseData);
  })
  .catch(function (err) {
    console.log(err)
    if (err.message === 'User Not Logged In.') return;
    if (err) return res.status(400).json(err);
  });
});

router.get('/:petId', function(req, res, next) {
  Pets.findOne({ _id: req.params.petId})
  .exec()
  .then(function(pet) {
    return res.status(200).json({data: pet});
  })
  .catch(function(err) {
    return res.status(400).json({message: err});
  })
});

router.post('/:petId/favorite', Middleware.isLoggedIn, function(req, res, next) {
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
      console.log(favorites[0].active)
      return favorites[0].save();
    } else {
      var fav = new Favorite();
      fav.userID = req.user._id;
      fav.petID = req.params.petId;

      return fav.save();
    }
  })
  .then(function(fav) {
    return res.status(200).json(fav);
  })
  .catch(function (err) {
    console.log(err)
    if (err) return res.status(400).json(err);
  });
});

module.exports = router;
