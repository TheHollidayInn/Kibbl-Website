var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  petID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteerOpportunity'
  },
  shelterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter'
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  active: { type: Boolean, default: true },
  createdAt: {type: Date, default: new Date()},
});

var Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
