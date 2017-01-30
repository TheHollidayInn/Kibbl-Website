require('../../test-helpers');

let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');

let integrationHelpers = require('../../integration-helpers');
let server = require('../../../app');

let should = chai.should();
chai.use(chaiHttp);

let Contact = require("../../../models/contact.js");

describe('Contact: POST', () => {
  let contactInfo = {
    petID: 'req.body.petId',
    firstName: 'req.body.firstName',
    lastName: 'req.body.lastName',
    email: 'req.body.email',
    message: 'req.body.message',
  };
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

  afterEach(function(done) {
    Contact.remove({}, function() {
      done();
    });
  });

  it('returns an error when user is not logged in', (done) => {
    request(server)
      .post('/api/v1/contacts')
      .send(contactInfo)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.eql('No token provided.');
        done();
      });
  });

  it('creates a contact message', (done) => {
    request(server)
      .post('/api/v1/contacts')
      .set('x-access-token', userdata.token)
      .send(contactInfo)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.exist;
        done();
      });
  });
});