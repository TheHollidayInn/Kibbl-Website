const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  email: String,
  location: String,
  active: {type: Boolean, default: false},
});

module.exports = mongoose.model('EmailSubscribers', schema);
