require('../../test-helpers');

let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');
let sinon = require('sinon');
let sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

let integrationHelpers = require('../../integration-helpers');
let server;

let should = chai.should();
chai.use(chaiHttp);

let Notification = require("../../../models/notifications.js");

describe('Notification: POST', () => {
  let contactInfo = {
    shelterId: 'req.body.shelterId',
  };
  let userdata;

  before(function (done) {
    // server = require('../../../app');
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
    Notification.remove({}, function() {
      done();
    });
  });

  it('returns an error when user is not logged in', (done) => {
    request(server)
      .post('/api/v1/notifications')
      .send(contactInfo)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.eql('No token provided.');
        done();
      });
  });

  it('creates a notification', (done) => {
    request(server)
      .post('/api/v1/notifications')
      .set('x-access-token', userdata.token)
      .send(contactInfo)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.exist;
        done();
      });
  });
});
