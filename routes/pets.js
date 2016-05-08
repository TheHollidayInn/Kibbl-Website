var express = require('express');
var router = express.Router();

var Pets = require('../models/pets');
var Favorite = require('../models/favorites');

var Middleware = require('../middleware');

router.get('/', function(req, res, next) {

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

  Pets.find(query)
  .limit(20)
  .exec(function(err, pets) {
    if (err) return res.status(400).json(err);
    res.status(200).json(pets);
  });
});

router.get('/:petId', function(req, res, next) {
  Pets.findOne({ _id: req.params.petId})
  .exec(function(err, pets) {
    if (err) return res.status(400).json(err);
    res.status(200).json(pets);
  });
});

router.post('/:petId/favorite', Middleware.isLoggedIn, function(req, res, next) {
  var fav = new Favorite();
  fav.userID = req.user._id;
  fav.petID = req.params.petId;

  fav.save(function(err, pets) {
    if (err) return res.status(400).json(err);
    res.status(200).json(fav);
  });
});

module.exports = router;
