var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  loctionDetails: {
    zipCode: String,
  },
  locationCoords: {
    type: { type: String, default: 'Point' },
    coordinates: {type: [Number], default: [0, 0]},
  },
  type: String,
  date: Date,
  time: String,
  createdAt: {type: Date, default: new Date()},
});

Schema.index({ locationCoords: '2dsphere' });

module.exports = mongoose.model('Event', Schema);
