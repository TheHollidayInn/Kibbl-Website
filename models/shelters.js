var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: {type: Date, default: new Date()},
});

module.exports = mongoose.model('Shelter', Schema);
