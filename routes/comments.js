var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Comment = require('../models/comments');
var Middleware = require('../middleware');

router.post('/', Middleware.hasValidToken, function(req, res, next) {
  let itemId = req.body.itemId;

  let comment = new Comment();
  comment.userID = req.user._id;
  comment.referenceId = itemId;
  comment.text = req.body.text;

  return comment.save()
    .then(function (result) {
      return res.status(201).json({comment});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

router.get('/', function(req, res, next) {
  let itemId = req.query.itemId;
  let query = {
    referenceId: itemId,
  };

  return Comment.find(query).exec()
    .then(function (comments) {
      return res.status(200).json({comments});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

module.exports = router;
