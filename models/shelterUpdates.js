var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  shelterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter'
  },
  newPets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  updatedPets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  newEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  updatedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
});

var Pets = mongoose.model('ShelterUpdate', Schema);
module.exports = Pets;
