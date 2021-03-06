const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = require('chai').expect;
global.expect = expect;
chai.use(chaiHttp);
global.server = require('../app');
global.request = require('supertest');
let Bluebird = require('bluebird');
Bluebird.promisifyAll(global.request);
let passport = require('passport');
let faker = require('faker');
global.sinon = require('sinon');
let sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(global.sinon);

let User = require("../models/user.js");

function generateUser() {
  var user;
  server = require('../app')

  var promise = new Promise(function(resolve, reject) {
    request(server)
     .post('/api/v1/register')
     .send({ email: faker.internet.email(), password: 'password' })
     .end(function(err, res) {
       if (err) return reject(err);
       user = res.body;
      //  var cookies = res.headers['set-cookie'].pop().split(';')[0];
       resolve(user);
     });
  });

  return promise
  .then(function(cookies) {
    // var req = request(server);
    // // Set cookie to get saved user session
    // req.cookies = cookies;
    var userToReturn = {
      userData: user,
      cookies: cookies,
    };
    return userToReturn;
  })
  .catch(function (error) {
    console.log('error' + error.message);
  });
}

module.exports = {
  generateUser: generateUser,
};
