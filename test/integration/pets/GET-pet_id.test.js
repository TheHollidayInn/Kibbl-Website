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
  let pet;

  before(function (done) {
    integrationHelpers.generateUser()
      .then(function(generatedUser) {
        userdata = generatedUser.userData;

        let petToSave = new Pet();
        return petToSave.save();
      })
      .then(petSaved => {
        pet = petSaved;
        done();
      })
      .catch(function (error) {
        console.log("error", error)
        done();
      })
  });

  after(done => {
    Favorite.remove({}, function() {
      done();
    });
  });

  it('returns a pet detail', (done) => {
    request(server)
      .get(`/api/v1/pets/${pet._id}`)
      .set('x-access-token', userdata.token)
      .end((err, res) => {
        res.should.have.status(200);
        let petFound = res.body.data;

        petFound._id.should.eql(String(pet._id));
        petFound.name.should.eql('');
        petFound.status.should.eql('');
        petFound.age.should.eql('');
        petFound.size.should.eql('');
        petFound.media.should.eql([]);
        petFound.petId.should.eql('');
        petFound.shelterPetId.should.eql('');
        petFound.rescueGroupId.should.eql('');
        petFound.sex.should.eql('');
        petFound.lastUpdate.should.eql('');
        petFound.animal.should.eql('');
        petFound.favorited.should.eql(false);
        petFound.contact.should.eql({
          phone: '',
          state: '',
          address2: '',
          email: '',
          zip: '',
          fax: '',
          address1: ''
        });
        petFound.breeds.should.eql([]);
        done();
      });
  });

  it('returns favorite true if user has favorited the pet', (done) => {
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
            done();
          });
      });
  });
});
