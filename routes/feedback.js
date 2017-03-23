var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Feedback = require('../models/feedback');
var Middleware = require('../middleware');

router.post('/', Middleware.hasValidToken, function(req, res, next) {
  let feedback = new Feedback();
  feedback.userID = req.user._id;
  feedback.text = req.body.text;
  // @TODO: How to handle replies?

  return feedback.save()
    .then(function (result) {
      return res.status(201).json({feedback});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

router.get('/', Middleware.hasValidToken, function(req, res, next) {
  let query = {
    userID: req.user._id,
  };

  return Feedback.find(query).exec()
    .then(function (feedback) {
      return res.status(200).json({feedback});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

module.exports = router;
