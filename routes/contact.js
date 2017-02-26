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

  // @TODO: Allow for continunig of a message thread by getting the subject and message id to reply to
  var data = {
    from: 'Koala Tea <postmaster@mg.koalatea.io>',
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
  var contact = new Contact();
  contact.email = req.body.sender;
  contact.message = req.body['stripped-text'];
  contact.messageId = req.body['Message-Id'];
  contact.inReplyTo = req.body['In-Reply-To'];
  contact.subject = req.body['Subject'];
  contact.fromEmailService = true;
  contact.fromEmailServiceDetails = req.body;

  contact.save()
    .then(function(err) {
      return res.status(201).json({data: contact});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

module.exports = router;
