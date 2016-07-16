var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  petID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pets'
  },
  active: { type: Boolean, default: true },
});

var Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
