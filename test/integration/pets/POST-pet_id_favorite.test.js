require('../../test-helpers');

let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');

let integrationHelpers = require('../../integration-helpers');
let server = require('../../../app');

let should = chai.should();
chai.use(chaiHttp);

let Pet = require("../../../models/pets");
let Favorite = require('../../../models/favorites');

describe('Pet Favorite: POST', () => {
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
  });

  it('returns an error when user is not logged in', (done) => {
    request(server)
      .post(`/api/v1/pets/${pet._id}/favorite`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.eql('No token provided.');
        done();
      });
  });

  it('favorites a pet', (done) => {
    request(server)
      .post(`/api/v1/pets/${pet._id}/favorite`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        let favorite = res.body.data;
        favorite.petID.should.eql(pet._id+'');
        favorite.userID.should.equal(userdata.user._id);
        favorite.active.should.equal(true);
        done();
      });
  });

  it('toggles a favorite', (done) => {
    request(server)
      .post(`/api/v1/pets/${pet._id}/favorite`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        request(server)
          .post(`/api/v1/pets/${pet._id}/favorite`)
          .set('x-access-token', userdata.token)
          .end((err, res) => {
            res.should.have.status(200);
            let favorite = res.body.data;
            favorite.petID.should.eql(pet._id+'');
            favorite.userID.should.equal(userdata.user._id);
            favorite.active.should.equal(false);
            done();
          });
      });
  });
});
