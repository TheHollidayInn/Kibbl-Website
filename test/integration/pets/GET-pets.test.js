require('../../test-helpers');

let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');

let integrationHelpers = require('../../integration-helpers');
let server = require('../../../app');

let should = chai.should();
chai.use(chaiHttp);

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
        console.log(Object.keys(res.body));
        res.body.data.exist;
        done();
      });
  });
});
