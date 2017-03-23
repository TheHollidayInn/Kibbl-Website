var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback'
  }],
  text: String,
  createdAt: {type: Date, default: new Date()},
});

var Feedback = mongoose.model('Feedback', schema);
module.exports = Feedback;
