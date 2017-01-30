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

describe('Favorites: GET', () => {
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
        request(server)
          .post(`/api/v1/pets/${pet._id}/favorite`)
          .set('x-access-token', userdata.token)
          .end((err, res) => {
            done();
          });
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
      .get(`/api/v1/favorites`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.eql('No token provided.');
        done();
      });
  });

  it('gets a favorties for a user', (done) => {
    request(server)
      .get(`/api/v1/favorites`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        let favorites = res.body.data;
        favorites.length.should.eql(1);
        favorites[0].petID._id.should.eql(''+pet._id);
        done();
      });
  });
});
