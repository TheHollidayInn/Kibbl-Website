var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: String,
  description: String,
  contact: {
    email: String,
    phone: String,
  },
  shelterId: String,
  createdAt: {type: Date, default: new Date()},
});

module.exports = mongoose.model('VolunteerOpportunity', Schema);
