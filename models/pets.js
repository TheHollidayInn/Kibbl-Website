var mongoose = require('mongoose');

var petSchema = new mongoose.Schema({
},
{ collection : 'pets' });

var Pets = mongoose.model('Pets', petSchema);
module.exports = Pets;
