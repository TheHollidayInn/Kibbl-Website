var express = require('express');
var router = express.Router();

var Notification = require('../models/notifications');
var Middleware = require('../middleware');

router.post('/', Middleware.hasValidToken, function(req, res, next) {
  Notification.find({
    userID: req.user._id,
    shelterId: req.body.shelterId,
  }).exec()
  .then(function(favorites) {
    if (favorites[0]) {
      if (favorites[0].active) {
        favorites[0].active = false;
      } else {
        favorites[0].active = true;
      }
      return favorites[0].save();
    } else {
      var fav = new Notification();
      fav.userID = req.user._id;
      fav.shelterId = req.body.shelterId;
      fav.active = true;

      return fav.save();
    }
  })
  .then(function(fav) {
    return res.status(200).json({data: fav});
  })
  .catch(function (err) {
    if (err) return res.status(400).json(err);
  });
});

router.get('/', Middleware.hasValidToken, function (req, res, next) {
  Notification
    .find({
      userID: req.user._id,
      active: true,
    })
    .populate('shelterId')
    .exec()
    .then(function(contacts) {
      return res.status(201).json({data: contacts});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

module.exports = router;