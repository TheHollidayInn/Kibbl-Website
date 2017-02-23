var nconf = require('nconf');
var express = require('express');
var router = express.Router();

var Contact = require('../models/contact');
var Middleware = require('../middleware');

var api_key = nconf.get('MAIL:API_KEY');
var domain = nconf.get('MAIL:DOMAIN');
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

router.post('/', Middleware.hasValidToken, function(req, res, next) {
  var contact = new Contact();
  contact.userID = req.user._id;
  contact.petID = req.body.petId;
  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.email = req.body.email;
  contact.message = req.body.message;


  var data = {
    from: 'Keith Holliday <postmaster@mg.koalatea.io>',
    to: req.body.email,
    subject: 'Testing',
    text: req.body.message
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(error, body);
  });

  contact.save()
    .then(function(err) {
      return res.status(201).json({data: contact});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

router.post('/message-receive', function (req, res, next) {
  console.log(req.body);
  var contact = new Contact();
  contact.email = req.body.recipient;
  contact.message = req.body.message;
  contact.fromEmailService = true;
  contact.fromEmailServiceDetails = JSON.stringify(req.body);

  contact.save()
    .then(function(err) {
      return res.status(201).json({data: contact});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

module.exports = router;
