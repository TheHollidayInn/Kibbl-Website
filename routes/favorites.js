var express = require('express');
var router = express.Router();

var Favorite = require('../models/favorites');

var Middleware = require('../middleware');

router.get('/', Middleware.isLoggedIn, function(req, res, next) {
  Favorite.find({ userID: req.user._id})
  .populate('petID')
  .exec(function(err, favorites) {
    if (err) return res.status(400).json(err);
    res.status(200).json(favorites);
  });
});

module.exports = router;
