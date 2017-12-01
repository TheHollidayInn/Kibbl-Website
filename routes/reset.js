var CryptoJS = require("crypto-js");
var express = require('express');
var router = express.Router();

var Mailgun = require('../libraries/mailgun');
var User = require('../models/user');

router.post('/', function(req, res, next) {
  var token = req.body.token;
  var password = req.body.password;

  if (!token || !password) {
    return res.status(401).json({
      message: 'Must provide a token and password.',
    });
  }

  token = decodeURIComponent(token);
  // var bytes  = CryptoJS.AES.decrypt(token.toString(), nconf.get('JWT_SECRET'));
  // let json = bytes.toString(CryptoJS.enc.Utf8);

  if (!token) {
    return res.status(401).json({
      message: 'Password reset token is invalid or has expired.',
    });
  }
  // var decryptedData = JSON.parse(json);

  User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  })
  .then((user) => {
    if (!user) {
      return res.status(401).json({
        message: 'Password reset token is invalid or has expired.',
      });
    }

    user.password = user.generateHash(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    return user.save();
  })
  .then(function (result) {
    if (!result._id) return;
    return res.status(201).json({message: 'Success, your password has been changed'});
  });
});

module.exports = router;
