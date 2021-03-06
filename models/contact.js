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
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteerOpportunity'
  },
  shelterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelters'
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events'
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
  originalContactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  },
  createdAt: {type: Date, default: new Date()},
});

var Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
