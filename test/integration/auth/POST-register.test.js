require('../../test-helpers');

let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');

// let integrationHelpers = require('../../integration-helpers');
let server = require('../../../app');

let should = chai.should();
chai.use(chaiHttp);

describe('Auth: Register', () => {
  let exampleUsername = 'example-username';
  let examplePass = 'example-pass';

  it('registers a user', (done) => {
    request(server)
      .post('/api/v1/register')
      .send({
        email: exampleUsername,
        password: examplePass,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.user.local.email.should.eql(exampleUsername);
        done();
      });
  });

  it('returns an error when fields are not provided', (done) => {
    request(server)
      .post('/api/v1/register')
      .send({
        email: exampleUsername,
        password: undefined,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.eql('You must supply an email and password');
        done();
      });
  });

  it('returns an error when username is already used', (done) =>  {
    let exampleUsername2 = `${exampleUsername}2`;

    request(server)
      .post('/api/v1/register')
      .send({
        email: exampleUsername2,
        password: examplePass,
      })
      .end((err, res) => {
        request(server)
          .post('/api/v1/register')
          .send({
            email: exampleUsername,
            password: examplePass,
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.message.should.eql('User already exists.');
            done();
          });
      });
  });
});
