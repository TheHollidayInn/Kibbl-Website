require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

// Script
const Shelter = require('../models/shelters');

var opportunity = new Shelter();
opportunity.name = 'Foothills Animal Shelter';
opportunity.description = 'Foothills Animal Shelter is an open-admissions facility, which means we never turn away an animal. We care for more than 9,500 orphaned cats, kittens, dogs, puppies and critters every year with a compassionate team of staff and volunteers. (Unfortunately, we can not accept wild animals; they should be taken to organizations who specialize in their care.) We are a true community resource and offer a variety of services including pet adoption, Jefferson County pet licensing, affordable spaying and neutering, vaccinations, microchipping and lost and found pets. We are committed to our important mission and the life-saving work that we do every day of the year. - See more at: http://foothillsanimalshelter.org/about/about-foothills-animal-shelter/#sthash.A5jTVepq.dpuf';

opportunity.save()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (err) {
    console.log(err)
  })
