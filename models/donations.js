var mongoose = require('mongoose');

var donationsSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  petID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pets'
  },
  amount: String,
  email: String,
  chargeId: String,
  stripeCustomer: String,
});

var Donations = mongoose.model('Donations', donationsSchema);
module.exports = Donations;
