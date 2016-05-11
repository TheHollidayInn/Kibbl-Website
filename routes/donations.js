var express = require('express');
var router = express.Router();

var Donations = require('../models/donations');

var Middleware = require('../middleware');

router.get('/', Middleware.isLoggedIn, function(req, res, next) {
  Donations.find({ userID: req.user._id})
  .populate('petID')
  .exec(function(err, donations) {
    if (err) return res.status(400).json(err);
    res.status(200).json(donations);
  });
});

module.exports = router;
