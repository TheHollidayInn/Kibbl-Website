var express = require('express');
var router = express.Router();

var Notification = require('../models/notifications');
var ShelterUpdate = require('../models/shelterUpdates');
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
        req.user.limits.subs -= 1;
      } else {
        if (req.user.limits.subs === 10) return res.status(401).json({message: 'You have reached your limit of 10 subscriptions.'});
        favorites[0].active = true;
        req.user.limits.subs += 1;
      }
      return favorites[0].save();
    } else {
      if (req.user.limits.subs === 10) return res.status(401).json({message: 'You have reached your limit of 10 subscriptions.'});

      var fav = new Notification();
      fav.userID = req.user._id;
      fav.shelterId = req.body.shelterId;
      fav.active = true;
      req.user.limits.subs += 1;

      return fav.save();
    }
  })
  .then(function(fav) {
    if (!fav._id) return;
    req.user.save();

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

router.get('/user-notifications', Middleware.hasValidToken, function (req, res, next) {
  Notification
    .find({
      userID: req.user._id,
      active: true,
    })
    .exec()
    .then((notifications) => {
      let shelterIds = notifications.map((notification) => {return notification.shelterId});
      console.log({
        shelterId: {$in: shelterIds},
      })
      return ShelterUpdate
        .find({ shelterId: "58dc81953aecdd49742f99ed"})
        .populate([
          {path: 'shelterId'},
          {path: 'newPets'},
          {path: 'updatedPets'},
          {path: 'newEvents'},
          {path: 'updatedEvents'},
        ])
        .exec()
    })
    .then(function(contacts) {
      return res.status(201).json({data: contacts});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

module.exports = router;
