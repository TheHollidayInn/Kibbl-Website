require('../../test-helpers');
let integrationHelpers = require('../../integration-helpers');
let Pet = require("../../../models/pets");

describe('Events: Get', () => {
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

  it('returns events', (done) => {
    request(server)
      .get('/api/v1/events')
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        console.log(res.body)
        res.should.have.status(200);
        res.body.total.exist;
        res.body.pets.exist;
        done();
      });
  });

  xit('fitlers pets by location', (done) => {
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
