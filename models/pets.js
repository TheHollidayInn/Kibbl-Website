var mongoose = require('mongoose');

var petSchema = new mongoose.Schema({
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
  media: [String],
  petId: String,
  shelterPetId: String,
  breeds: [String],
  name: String,
  sex: String,
  description: String,
  lastUpdate: String,
  animal: String,
},
{ collection : 'pets' });

var Pets = mongoose.model('Pets', petSchema);
module.exports = Pets;
