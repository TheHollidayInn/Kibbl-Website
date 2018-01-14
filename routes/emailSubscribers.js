const express = require('express');
const router = express.Router();

const EmailSubscribers = require('../models/emailSubscribers');

router.post('/', async (req, res) => {
  console.log(req.body)
  const {email, location} = req.body;

  if (!email || !location) {
    return res.status(400).json({err: 'Email and Location required'});
  }

  const subscriber = new EmailSubscribers();
  subscriber.email = email;
  subscriber.location = location;
  subscriber.active = true;
  await subscriber.save();

  return res.status(201).json({subscriber});
});

router.post('/unsubscribe', async (req, res) => {
  const {email} = req.body;

  if (!email) {
    return res.status(400).json({err: 'Email required'});
  }

  const subscriber = await EmailSubscribers.findOne({email}).exec();

  if (!subscriber) {
    return res.status(404).json({err: 'Subscription not found'});
  }

  if (!subscriber.active) {
    return res.status(401).json({err: 'Subscription is inactive'});
  }

  subscriber.active = false;
  await subscriber.save();

  return res.status(200).json({subscriber});
});

module.exports = router;
