var express = require('express');
var router = express.Router();

var VolunteerOpportunity = require('../models/volunteerOpportunity');
var Middleware = require('../middleware');

router.get('/', Middleware.hasValidToken, function(req, res, next) {
  VolunteerOpportunity.find({})
  .exec(function(err, favorites) {
    if (err) return res.status(400).json(err);
    res.status(200).json({data:favorites});
  });
});

router.get('/:volunteerId', function(req, res, next) {
  let pet;
  let user;
  // @TODO: Check for user status on evnet (attending, subscribed?)
  VolunteerOpportunity.findOne({ _id: req.params.volunteerId}).exec()
    .then(function(favoriteFound) {
      return res.status(200).json({data: favoriteFound});
    })
    .catch(function(err) {
      return res.status(400).json({message: err});
    });
});

module.exports = router;
