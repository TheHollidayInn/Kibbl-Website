var express = require('express');
var router = express.Router();

var Shelter = require('../models/shelters');
var Middleware = require('../middleware');

router.get('/', Middleware.hasValidToken, function(req, res, next) {
  Shelter.find({})
  .exec(function(err, favorites) {
    if (err) return res.status(400).json(err);
    res.status(200).json({data:favorites});
  });
});

router.get('/:shelterId', function(req, res, next) {
  let pet;
  let user;
  // @TODO: Check for user status on evnet (attending, subscribed?)
  Shelter.findOne({ _id: req.params.shelterId}).exec()
    .then(function(favoriteFound) {
      return res.status(200).json({data: favoriteFound});
    })
    .catch(function(err) {
      return res.status(400).json({message: err});
    });
});

module.exports = router;
