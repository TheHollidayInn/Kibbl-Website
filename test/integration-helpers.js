//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);

var server = require('../app')
var request = require('supertest');
var Account = require("../models/account.js");
var passport = require('passport');

function generateUser() {
  var user;

  var promise = new Promise(function(resolve, reject) {
    request(server)
     .post('/api/register')
     .send({ username: 'test2711@test.com', password: 'password' })
     .end(function(err, res) {
       if (err) return reject(err);
       user = res.body;
       var cookies = res.headers['set-cookie'].pop().split(';')[0];
       resolve(cookies);
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
