var express = require('express');
var router = express.Router();

var Event = require('../models/events');
var Middleware = require('../middleware');

router.get('/', function(req, res, next) {
  Event.find({})
  .populate('petID')
  .exec(function(err, favorites) {
    if (err) return res.status(400).json(err);
    res.status(200).json({data:favorites});
  });
});

router.get('/:eventId', function(req, res, next) {
  let pet;
  let user;
  // @TODO: Check for user status on evnet (attending, subscribed?)
  Event.findOne({ _id: req.params.eventId}).exec()
    .then(function(favoriteFound) {
      return res.status(200).json({data: favoriteFound});
    })
    .catch(function(err) {
      return res.status(400).json({message: err});
    });
});

module.exports = router;
