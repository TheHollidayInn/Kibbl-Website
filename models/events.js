var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: String,
  createdAt: {type: Date, default: new Date()},
});

module.exports = mongoose.model('Event', Schema);