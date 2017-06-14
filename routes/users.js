var express = require('express');
var router = express.Router();

var Middleware = require('../middleware');
var User = require('../models/user');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/push-notification', Middleware.hasValidToken, function(req, res, next) {
  let user = req.user;
  let deviceToken = req.body.deviceToken;
  let platform = req.body.platform;
  let active = req.body.active;

  if (!deviceToken || !platform || !active) {
    return res.status(401).json({message: 'You must include a deviceToken, platform and active status'});
  }

  User.update({_id: req.user._id}, {
    $set: {
      'pushNotification.deviceToken': deviceToken,
      'pushNotification.platform': platform,
      'pushNotification.active': active,
    },
  }).exec()
  .then(function(user) {
    return res.status(200).json({data});
  })
  .catch(function (err) {
    if (err) return res.status(400).json(err);
  });
});

module.exports = router;
