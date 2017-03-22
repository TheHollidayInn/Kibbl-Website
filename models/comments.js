var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  text: String,
  createdAt: {type: Date, default: new Date()},
});

var Comment = mongoose.model('Comment', schema);
module.exports = Comment;
