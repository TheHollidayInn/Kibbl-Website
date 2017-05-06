var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  shelterId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter'
  }],
});

var Pets = mongoose.model('ShelterUpdate', Schema);
module.exports = Pets;
