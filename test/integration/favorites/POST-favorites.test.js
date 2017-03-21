require('../../test-helpers');
let integrationHelpers = require('../../integration-helpers');

let Pet = require("../../../models/pets");
let Shelter = require("../../../models/shelters");
let Volunteer = require("../../../models/volunteerOpportunity");
let Event = require("../../../models/events");
let Favorite = require('../../../models/favorites');

describe('Favorite: POST', () => {
  let userdata;
  let pet;

  before(function (done) {
    integrationHelpers.generateUser()
      .then(function(generatedUser) {
        userdata = generatedUser.userData;
        return Pet.findOne();
      })
      .then(function (petFound) {
        pet = petFound;
        done();
      })
      .catch(function (error) {
        console.log("error", error)
        done();
      })
  });

  afterEach(function(done) {
    Favorite.remove({}, function() {
      done();
    });
    Pet.remove({}, function() {
      done();
    });
    Shelter.remove({}, function() {
      done();
    });
    Volunteer.remove({}, function() {
      done();
    });
    Event.remove({}, function() {
      done();
    });
  });

  it('returns an error when user is not logged in', (done) => {
    request(server)
      .post(`/api/v1/favorites`)
      .endAsync()
      .then((res) => {
        res.should.have.status(403);
        res.body.message.should.eql('No token provided.');
        done();
      });
  });

  it('favorites a pet', (done) => {
    let pet = new Pet();
    pet.save()
      .then((petSaved) => {
        return request(server)
          .post('/api/v1/favorites')
          .send({
            type: 'pet',
            itemId: petSaved._id,
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then((res) => {
        res.should.have.status(200);
        let favorite = res.body.favorite;
        favorite.petID.should.eql(pet._id+'');
        favorite.userID.should.equal(userdata.user._id);
        favorite.active.should.equal(true);
        done();
      });
  });

  it('favorites an event', (done) => {
    let pet = new Event();
    pet.save()
      .then((petSaved) => {
        return request(server)
          .post('/api/v1/favorites')
          .send({
            type: 'event',
            itemId: petSaved._id,
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then((res) => {
        res.should.have.status(200);
        let favorite = res.body.favorite;
        favorite.eventId.should.eql(pet._id+'');
        favorite.userID.should.equal(userdata.user._id);
        favorite.active.should.equal(true);
        done();
      });
  });

  it('favorites a shelter', (done) => {
    let pet = new Shelter();
    pet.save()
      .then((petSaved) => {
        return request(server)
          .post('/api/v1/favorites')
          .send({
            type: 'shelter',
            itemId: petSaved._id,
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then((res) => {
        res.should.have.status(200);
        let favorite = res.body.favorite;
        favorite.shelterId.should.eql(pet._id+'');
        favorite.userID.should.equal(userdata.user._id);
        favorite.active.should.equal(true);
        done();
      });
  });

  it('favorites an opportunity', (done) => {
    let pet = new Volunteer();
    pet.save()
      .then((petSaved) => {
        return request(server)
          .post('/api/v1/favorites')
          .send({
            type: 'volunteer',
            itemId: petSaved._id,
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then((res) => {
        res.should.have.status(200);
        let favorite = res.body.favorite;
        favorite.volunteerId.should.eql(pet._id+'');
        favorite.userID.should.equal(userdata.user._id);
        favorite.active.should.equal(true);
        done();
      });
  });

  it('toggles a favorite', (done) => {
    let pet = new Pet();
    let petSaved;

    pet.save()
      .then((petSaved) => {
        pet = petSaved;
        return request(server)
          .post('/api/v1/favorites')
          .send({
            type: 'pet',
            itemId: petSaved._id,
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then((res) => {
        return request(server)
          .post('/api/v1/favorites')
          .send({
            type: 'pet',
            itemId: pet._id,
          })
          .set('x-access-token', userdata.token)
          .endAsync();
      })
      .then((res) => {
        res.should.have.status(200);
        let favorite = res.body.favorite;
        favorite.petID.should.eql(pet._id+'');
        favorite.userID.should.equal(userdata.user._id);
        favorite.active.should.equal(false);
        done();
      });
  });
});
