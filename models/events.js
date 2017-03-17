var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  date: String,
  time: String,
  createdAt: {type: Date, default: new Date()},
});

module.exports = mongoose.model('Event', Schema);
