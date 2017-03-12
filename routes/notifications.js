var express = require('express');
var router = express.Router();

var Notification = require('../models/notifications');
var Middleware = require('../middleware');

router.post('/', Middleware.hasValidToken, function(req, res, next) {
  var contact = new Notification();
  contact.userID = req.user._id;
  contact.shelterId = req.body.shelterId;
  
  contact.save()
    .then(function(err) {
      return res.status(201).json({data: contact});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

router.get('/', Middleware.hasValidToken, function (req, res, next) {
  Notification.find({userID: req.user._id})
    .then(function(contacts) {
      return res.status(201).json({data: contacts});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

module.exports = router;