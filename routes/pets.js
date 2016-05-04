var express = require('express');
var router = express.Router();

var Pets = require('../models/pets');

router.get('/', function(req, res, next) {

  var query = {};

  if (req.query.type) {
    query.animal = {t: req.query.type};
  }

  Pets.find(query)
  .limit(20)
  .exec(function(err, pets) {
    if (err) return res.status(400).json(err);
    res.status(200).json(pets);
  });
});

module.exports = router;
