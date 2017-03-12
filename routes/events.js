var express = require('express');
var router = express.Router();

var Event = require('../models/events');
var Middleware = require('../middleware');

router.get('/', Middleware.hasValidToken, function(req, res, next) {
  Event.find({})
  .populate('petID')
  .exec(function(err, favorites) {
    if (err) return res.status(400).json(err);
    res.status(200).json({data:favorites});
  });
});

module.exports = router;
