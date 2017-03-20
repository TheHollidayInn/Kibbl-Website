let moment = require('moment');
let express = require('express');
let router = express.Router();

let Event = require('../models/events');
let Middleware = require('../middleware');

router.get('/', function(req, res, next) {
  let query = {};

  if (req.query.zipCode) {
    query['loctionDetails.zipCode'] = req.query.zipCode;
  }

  if (req.query.type) {
    query.type = req.query.type;
  }

  if (req.query.startDate) {
    if (!query.date) query.date = {};
    query.date.$gte = moment(req.query.startDate).toISOString();
  }

  if (req.query.endDate) {
    if (!query.date) query.date = {};
    query.date.$lte = moment(req.query.endDate).toISOString();
  }

  Event.find(query)
  .populate('petID')
  .exec(function(err, favorites) {
    if (err) return res.status(400).json(err);
    res.status(200).json({data:favorites});
  });
});

router.get('/:eventId', function(req, res, next) {
  let pet;
  let user;
  // @TODO: Check for user status on evnet (attending, subscribed?)
  Event.findOne({ _id: req.params.eventId}).exec()
    .then(function(favoriteFound) {
      return res.status(200).json({data: favoriteFound});
    })
    .catch(function(err) {
      return res.status(400).json({message: err});
    });
});

module.exports = router;
