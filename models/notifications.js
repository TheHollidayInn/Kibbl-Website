var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  shelterId: {type: String},
  active: {type: Boolean, default: false},
  createdAt: {type: Date, default: new Date()},
});

var Notification = mongoose.model('Notification', Schema);
module.exports = Notification;
