const mailgun = require('mailgun-js');

const apiKey = process.env.MAIL_API_KEY;
const domain = process.env.MAIL_DOMAIN;
const Mailgun = apiKey ? ({ apiKey, domain }) : undefined;

const api = {};

api.mailgun = mailgun;

api.sendMessages = (data) => {
  if (!Mailgun) return null;
  return new Promise((resolve, reject) => {
    return Mailgun.messages().send(data, (error, body) => {
      if (error) return reject(error);
      return resolve(body);
    });
  });
};

module.exports = api;
