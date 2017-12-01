var CryptoJS = require("crypto-js");
var express = require('express');
var router = express.Router();

var Mailgun = require('../libraries/mailgun');
var User = require('../models/user');

router.post('/', function(req, res, next) {
  var email = req.body.email;
  var ciphertext;

  User.findOne({ 'local.email': email }).exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'No account with that email address exists.',
        });
      }

      ciphertext = CryptoJS.AES.encrypt(email, process.env.JWT_SECRET);

      user.resetPasswordToken = encodeURIComponent(ciphertext);
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      return user.save();
    })
    .then((user) => {
      if (!user._id) return;

      var data = {
        from: 'Koala Tea <admin@koalatea.io>',
        to: email,
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + ciphertext + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      return Mailgun.sendMessages(data);
    })
    .then(function (result) {
      if (!result) return;
      return res.status(201).json({data: result});
    })
    .catch(function(err) {
      console.log(err)
      return res.status(400).json(err);
    });
});

module.exports = router;
