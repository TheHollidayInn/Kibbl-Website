var fs = require('fs'),
  nconf = require('nconf');
  nconf.argv()
   .env()
   .file({ file: './config.json' });

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(nconf.get('db:URL'));

// Script
var Pet = require('../models/pets');

var opportunity = new Pet();

let petObj = {
    "status" : "A",
    "contact" : {
        "phone" : null,
        "state" : "TX",
        "address2" : null,
        "email" : "gnelsen@live.com",
        "zip" : "76205",
        "fax" : null,
        "address1" : "3717 N Elm Street"
    },
    "age" : "Young",
    "size" : "S",
    // "media" : [
    //     "http://photos.petfinder.com/photos/pets/36919577/1/?bust=1481142723&width=60&-pnt.jpg",
    //     "http://photos.petfinder.com/photos/pets/36919577/1/?bust=1481142723&width=95&-fpm.jpg",
    //     "http://photos.petfinder.com/photos/pets/36919577/1/?bust=1481142723&width=500&-x.jpg",
    //     "http://photos.petfinder.com/photos/pets/36919577/1/?bust=1481142723&width=300&-pn.jpg",
    //     "http://photos.petfinder.com/photos/pets/36919577/1/?bust=1481142723&width=50&-t.jpg"
    // ],
    "petId" : "36919577",
    "shelterPetId" : "66897",
    "breeds" : [
        "Tabby - Orange"
    ],
    "name" : "EPIC-BARN CAT",
    "sex" : "M",
    "description" : "3-4 MOTHS OLD, AVAILABLE NOW. FERAL BARN CAT.\nAdoption fee is $60. It pays to have the dog spayed or neutered; Rabies, Bordetella and DHPP Vaccines; treatment for fleas and ticks as needed, 1st month heartworm preventative, Deworming for hook and round worms, pre-surgical pain medications, occult heartworm test, and a Microchip.\nRemember to share the posts and &  like the Denton Animal Shelter Facebook page! \nAdoption hours are Monday - Saturday 10 AM - 5 PM.  Please forward any questions about dogs to animal.services@cityofdenton.com.",
    "lastUpdate" : "2016-12-07T20:32:04Z",
    "animal" : "Cat"
};

Object.assign(opportunity, petObj);

opportunity.save()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (err) {
    console.log(err)
  })
