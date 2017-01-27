var express = require('express');
var router = express.Router();

var Contact = require('../models/contact');

var Middleware = require('../middleware');

router.post('/', Middleware.hasValidToken, function(req, res, next) {
  var contact = new Contact();
  contact.userID = req.user._id;
  contact.petID = req.body.petId;
  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.email = req.body.email;
  contact.message = req.body.message;

  contact.save()
    .then(function(err) {
      res.status(201).json({data: contact});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

module.exports = router;
