var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  shelterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter'
  },
  linkId: {type: mongoose.Schema.Types.ObjectId}, // @TOOD: Cant populate with out ref?
  active: {type: Boolean, default: false},
  createdAt: {type: Date, default: new Date()},
});

var Notification = mongoose.model('Notification', Schema);
module.exports = Notification;
