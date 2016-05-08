var express = require('express');
var router = express.Router();

var Contact = require('../models/contact');

var Middleware = require('../middleware');

router.post('/', Middleware.isLoggedIn, function(req, res, next) {
  var contact = new Contact();
  contact.userID = req.user._id;
  contact.petID = req.body.petId;
  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.email = req.body.email;
  contact.message = req.body.message;

  contact.save(function(err, contact) {
    if (err) return res.status(400).json(err);
    res.status(200).json(contact);
  });
});

module.exports = router;
