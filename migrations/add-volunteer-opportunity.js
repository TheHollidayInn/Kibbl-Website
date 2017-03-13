var fs = require('fs'),
  nconf = require('nconf');
  nconf.argv()
   .env()
   .file({ file: './config.json' });
   
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(nconf.get('db:URL'));

// Script
var VolunteerOpportunity = require('../models/volunteerOpportunity');

var opportunity = new VolunteerOpportunity();
opportunity.name = "Foothills Animal Shelter: Foster Care";
opportunity.description = `Foster Parents: Loving volunteers are needed to care for Shelter animals in their homes. \ 
      Fostering is very rewarding and essential to the animal rescue and adoption efforts at the Shelter. \
      The time frame is generally 1-8 weeks at a time depending on the animal’s needs. \
      The Foster department will work with the foster parent’s schedule and will match the right animal with the right foster home. \
      A home visit will be conducted before being approved for this position. \
      Please contact our Foster Care Manager at foster@fas4pets.org or 720.407.5231 for details. \
      - See more at: http://foothillsanimalshelter.org/how-to-help/volunteer/volunteer-positions/#sthash.noa6h1TZ.dpuf`;
opportunity.contact.email = "foster@fas4pets.org";
opportunity.contact.phone = "720.407.5231";

opportunity.save()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (err) {
    console.log(err)
  })
  