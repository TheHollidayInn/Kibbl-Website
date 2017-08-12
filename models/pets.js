var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  userFavorited: Boolean,
  createdAt: {type: Date, default: new Date()},
  status: String,
  contact : {
    phone : String,
    state : String,
    address2 : String,
    email : String,
    zip : String,
    fax : String,
    address1 : String
  },
  age: String,
  size: String,
  media: [{
    urlSecureThumbnail: String,
    urlSecureFullsize: String,
  }],
  petId: String,
  rescueGroupdId: String,
  shelterPetId: String,
  breeds: [String],
  name: String,
  sex: String,
  description: String,
  lastUpdate: {type: Date},
  animal: String,
  locationCoords: {
    type: { type: String, default: 'Point' },
    coordinates: {type: [Number], default: [0, 0]},
  },
  shelterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter'
  },
});
Schema.index({ locationCoords: '2dsphere' });

var Pets = mongoose.model('Pet', Schema);
module.exports = Pets;
