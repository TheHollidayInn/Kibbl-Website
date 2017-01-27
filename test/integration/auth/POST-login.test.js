require('../../test-helpers');

let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');

// let integrationHelpers = require('../../integration-helpers');
let server = require('../../../app');

let should = chai.should();
chai.use(chaiHttp);

describe('Auth: Login', () => {
  let exampleUsername = 'example-username-login';
  let examplePass = 'example-pass';

  it('logs-in a user', (done) => {
    request(server)
      .post('/api/v1/register')
      .send({
        email: exampleUsername,
        password: examplePass,
      })
      .end((err, res) => {
        request(server)
          .post('/api/v1/login')
          .send({
            email: exampleUsername,
            password: examplePass,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.token.exist;
            done();
          });
      });
  });

  it('returns an error when fields are not provided', (done) => {
    request(server)
      .post('/api/v1/login')
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

  it('returns an error when username is not found', (done) =>  {
    let exampleUsername2 = `${exampleUsername}2`;

    request(server)
      .post('/api/v1/login')
      .send({
        email: exampleUsername2,
        password: examplePass,
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.eql('User not found.');
        done();
      });
  });

  it('returns an error if password is invalid', (done) => {
    let exampleUsername2 = `${exampleUsername}2`;

    request(server)
      .post('/api/v1/register')
      .send({
        email: exampleUsername,
        password: examplePass,
      })
      .end((err, res) => {
        request(server)
          .post('/api/v1/login')
          .send({
            email: exampleUsername,
            password: 'wrong',
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.message.should.eql('Password is incorrect.');
            done();
          });
      });
  });
});
