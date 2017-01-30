require('../../test-helpers');

let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');

let integrationHelpers = require('../../integration-helpers');
let server = require('../../../app');

let should = chai.should();
chai.use(chaiHttp);

let Pet = require("../../../models/pets");

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

  it('returns pets', (done) => {
    request(server)
      .get('/api/v1/pets')
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.total.exist;
        res.body.pets.exist;
        done();
      });
  });

  it('fitlers pets by location', (done) => {
    Pet.findOne()
    .then(function (pet) {
      let zipCode = pet._doc.contact.zip;
      request(server)
        .get(`/api/v1/pets?zipCode=${zipCode}`)
        .set('x-access-token', userdata.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.pets[0].contact.zip.should.equal(zipCode);
          res.body.pets[1].contact.zip.should.equal(zipCode);
          done();
        });
      });
  });
});
