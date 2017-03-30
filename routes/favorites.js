var express = require('express');
var router = express.Router();

var Favorite = require('../models/favorites');

var Middleware = require('../middleware');

router.get('/', Middleware.hasValidToken, function(req, res, next) {
  Favorite.find({
    userID: req.user._id,
    active: true,
  })
  .populate('petID')
  .limit(20)
  .sort('-createdAt')
  .exec(function(err, favorites) {
    if (err) return res.status(400).json(err);
    res.status(200).json({data:favorites});
  });
});

router.post('/', Middleware.hasValidToken, function (req, res, next) {
  let user = req.user;
  let type = req.body.type;
  let itemId = req.body.itemId;

  // @TODO: validate type and itemId
  let query = {
    userID: req.user._id,
  };

  if (type === 'pet') {
    query.petID = itemId;
  } else if (type === 'shelter') {
    query.shelterId = itemId;
  } else if (type === 'volunteer') {
    query.volunteerId = itemId;
  } else if (type === 'event') {
    query.eventId = itemId;
  }

  Favorite.find(query)
  .exec()
  .then(function(favorites) {
    if (favorites[0]) {
      if (favorites[0].active) {
        favorites[0].active = false;
      } else {
        favorites[0].active = true;
      }
      return favorites[0].save();
    } else {
      let favorite = new Favorite();
      favorite.userID = user._id;
      favorite.active = true;
      favorite.type = type;

      if (type === 'pet') {
        favorite.petID = itemId;
      } else if (type === 'shelter') {
        favorite.shelterId = itemId;
      } else if (type === 'volunteer') {
        favorite.volunteerId = itemId;
      } else if (type === 'event') {
        favorite.eventId = itemId;
      }

      return favorite.save();
    }
  })
  .then((favorite) => {
    res.status(200).json({favorite});
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;
