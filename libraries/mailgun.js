var api_key = process.env.MAIL_API_KEY;
var domain = process.env.MAIL_DOMAIN;
const mailgun = require('mailgun-js');
const Mailgun = api_key ? ({ apiKey: api_key, domain: domain }) : undefined;

var api = {};

api.mailgun = mailgun;

api.sendMessages = function (data) {
  if (!Mailgun) return;
  return new Promise(function (resolve, reject) {
    Mailgun.messages().send(data, function (error, body) {
      if (error) return reject(error);
      resolve(body);
    });
  })
};

module.exports = api;
