var api_key = process.env.MAIL_API_KEY;
var domain = process.env.MAIL_DOMAIN;
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
