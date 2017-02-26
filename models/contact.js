var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  petID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pets'
  },
  firstName: String,
  lastName: String,
  email: String,
  message: String,
  messageId: String,
  inReplyTo: String,
  subject: String,
  fromEmailService: Boolean,
  fromEmailServiceDetails: mongoose.Schema.Types.Mixed,
});

var Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
