var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: String,
  description: String,
  contact: {
    email: String,
    phone: String,
  },
  loctionDetails: {
    zipCode: String,
  },
  locationCoords: {
    type: { type: String },
    coordinates: [],
  },
  type: String,
  shelterId: String,
  createdAt: {type: Date, default: new Date()},
});
schema.index({ locationCoords: '2dsphere' });

module.exports = mongoose.model('VolunteerOpportunity', Schema);
