require('../../test-helpers');

let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');

let integrationHelpers = require('../../integration-helpers');
let server = require('../../../app');

let should = chai.should();
chai.use(chaiHttp);

let Pet = require("../../../models/pets");
let Favorite = require("../../../models/favorites");

describe('Pet: Get', () => {
  let userdata;

  before(function (done) {
    integrationHelpers.generateUser()
      .then(function(generatedUser) {
        userdata = generatedUser.userData;
        done();
      })
      .catch(function (error) {
        console.log("error", error)
        done();
      })
  });

  it('returns a pet detail', (done) => {
    Pet.findOne()
    .then(function (pet) {
      request(server)
        .get(`/api/v1/pets/${pet._id}`)
        .set('x-access-token', userdata.token)
        .end((err, res) => {
          res.should.have.status(200);
          let dataKeys = Object.keys(res.body.data);
          dataKeys.should.eql([ '_id',
            'status',
            'contact',
            'age',
            'size',
            'media',
            'petId',
            'shelterPetId',
            'breeds',
            'name',
            'sex',
            'description',
            'lastUpdate',
            'animal',
            'favorited' ]);
          done();
        });
    })
  });

  it('returns favorite true if user has favorited the pet', (done) => {
    Pet.findOne()
    .then(function (pet) {
      request(server)
        .post(`/api/v1/pets/${pet._id}/favorite`)
        .set('x-access-token', userdata.token)
        .end((err, res) => {
          request(server)
            .get(`/api/v1/pets/${pet._id}`)
            .set('x-access-token', userdata.token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.data.favorited.should.eql(true);

              // @TODO: Find a better place to clean up
              Favorite.remove({}, function() {
                done();
              });
            });
        });
    })
  });
});
