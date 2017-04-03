var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: String,
  description: String,
  loctionDetails: {
    zipCode: String,
  },
  locationCoords: {
    type: { type: String, default: 'Point' },
    coordinates: {type: [Number], default: [0, 0]},
  },
  type: String,
  createdAt: {type: Date, default: new Date()},
});
Schema.index({ locationCoords: '2dsphere' });

module.exports = mongoose.model('Shelter', Schema);
