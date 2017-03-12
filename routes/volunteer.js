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

module.exports = router;
