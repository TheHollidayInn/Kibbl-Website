var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: String,
  description: String,
  loctionDetails: {
    zipCode: String,
  },
  locationCoords: {
    type: { type: String },
    coordinates: [],
  },
  type: String,
  createdAt: {type: Date, default: new Date()},
});
Schema.index({ locationCoords: '2dsphere' });

module.exports = mongoose.model('Shelter', Schema);
