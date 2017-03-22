var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Contact = require('../models/contact');
var Middleware = require('../middleware');
var Mailgun = require('../libraries/mailgun');

router.post('/', Middleware.hasValidToken, function(req, res, next) {
  let type = req.body.type;
  let itemId = req.body.itemId;

  let contact = new Contact();
  contact.userID = req.user._id;
  contact.petID = req.body.petId;
  contact.firstName = req.body.firstName;
  contact.lastName = req.body.lastName;
  contact.email = req.body.email;
  contact.message = req.body.message;

  if (type === 'pet') {
    contact.petID = itemId;
  } else if (type === 'shelter') {
    contact.shelterId = itemId;
  } else if (type === 'volunteer') {
    contact.volunteerId = itemId;
  } else if (type === 'event') {
    contact.eventId = itemId;
  }

  if (req.body.inReplyTo) contact.inReplyTo = req.body.inReplyTo;
  if (req.body.originalContactId) contact.originalContactId = req.body.originalContactId;

  // @TODO: Allow for continunig of a message thread by getting the subject and message id to reply to
  var data = {
    from: 'Koala Tea <postmaster@mg.koalatea.io>',
    to: req.body.email,
    subject: 'Testing',
    text: req.body.message
  };

  if (req.body.inReplyTo) data['h:In-Reply-To'] = req.body.inReplyTo;

  Mailgun.sendMessages(data)
    .then(function (result) {
      contact.messageId = result.id;

      return contact.save();
    })
    .then(function(err) {
      if (!req.body.originalContactId) contact.originalContactId = contact._id;
      contact.save();

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

  let query = {
    messageId: contact.inReplyTo,
  };

  Contact.findOne(query)
    .then(function (foundMessage) {
      let originalContactId = foundMessage.originalContactId || foundMessage._id;

      contact.originalContactId = originalContactId;
      contact.save();
    })
    .then(function(err) {
      return res.status(201).json({data: contact});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

router.get('/conversations', Middleware.hasValidToken, function (req, res, next) {
  let query = {
    'userID': req.user._id,
  };

  Contact.aggregate( [
    { $match: { userID: mongoose.Schema.Types.ObjectId(req.user._id) } },
    { $group : { _id : "$email", email: { $push: "$email" } } },
    ])
    .then(function(contacts) {
      return res.status(201).json({data: contacts});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

router.get('/conversation/:id', function (req, res, next) {
  let query = {
    '$or': [
      {_id: req.params.id},
      {originalContactId: req.params.id},
    ],
  };

  Contact.find(query)
    .then(function(contacts) {
      return res.status(201).json({data: contacts});
    })
    .catch(function(err) {
      return res.status(400).json(err);
    });
});

module.exports = router;
