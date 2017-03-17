var fs = require('fs'),
  nconf = require('nconf');
  nconf.argv()
   .env()
   .file({ file: './config.json' });
   
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(nconf.get('db:URL'));

// Script
var Events = require('../models/events');

var opportunity = new Events();
opportunity.name = "Toby’s Pet Parade & Fair";
opportunity.description = `We are excited to announce that we have a new, dedicated website for Toby’s Pet Parade & Fair! On the website, you’ll find all the information you need about how to register for the Parade, costume ideas, details about the Fair and more!
The second annual event will be held on Saturday, September 16 in downtown Golden, CO. Dress up your dog in their best costume and join us for a celebration to benefit Foothills Animal Shelter. From a pet costume parade and contests, to flyball and agility demos, to family-friendly games and activities, you’re sure to find something for everyone, all while helping us raise critical funds to support the homeless pets at Foothills Animal Shelter!
CLICK HERE TO LEARN MORE ABOUT TOBY’S PET PARADE & FAIR.
- See more at: http://foothillsanimalshelter.org/newsevents/events/tobys-pet-parade-fair/#sthash.ocE0RFRD.dpuf`;
opportunity.location = "Parfet Park, Downtown Golden";
opportunity.date = "Saturday, September 16";
opportunity.time = "8:30 am – 1 pm";

opportunity.save()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (err) {
    console.log(err)
  })
  