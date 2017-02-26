var nconf = require('nconf');
var api_key = nconf.get('MAIL:API_KEY');
var domain = nconf.get('MAIL:DOMAIN');
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var api = {};

api.mailgun = mailgun;

api.sendMessages = function (data) {
  return new Promise(function (resolve, reject) {
    mailgun.messages().send(data, function (error, body) {
      if (error) return reject(error);
      resolve(body);
    });
  })
};

module.exports = api;
