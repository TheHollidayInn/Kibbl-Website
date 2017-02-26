require('../../test-helpers');

let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest');

let integrationHelpers = require('../../integration-helpers');
let server = require('../../../app');

let should = chai.should();
chai.use(chaiHttp);

let Contact = require("../../../models/contact.js");

describe('Contact: POST - Message Received', () => {
  let contactInfo = {
    petID: 'req.body.petId',
    firstName: 'req.body.firstName',
    lastName: 'req.body.lastName',
    email: 'req.body.email',
    message: 'req.body.message',
  };
  let messageInfo = {
    "domain":"mg.koalatea.io",
    "From":"Keith Holliday <keithrholliday@gmail.com>",
    "X-Envelope-From":"<keithrholliday@gmail.com>",
    "X-Google-Dkim-Signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20161025; h=x-gm-message-state:mime-version:references:in-reply-to:from:date :message-id:subject:to; bh=H+DirZvVUMrZ2UiqIT0bPRTTrE2G+CNDtminyZE79lE=; b=GJuhwvinY+g2wLieI/Kx/MhqIkE3daYxIMyGG7lrp8rT733Bf7Rt9w6ulHEMLPk34Q L9P3oLQhvRqfPZk9uuwJIKEw1mpfoU0jwCAPwEDxKgosxBbhYwOJr3ROm75HMmuypT42 W1LgTYgXUhWxqKVMWTg9UnweerqljjfcEGH5fNjPruDKu9y2FV6Z+rh1Fehq+1OIfvM8 XrWk/Xd2O7s3BDxADHoSYIVAdAtjNnwBbm5x6o98AajSH++6vFmkpQ/ZuWP+wnW2JDnB Hsn6hVoL1lqkYt5PWx5Fjo+CG38s5IKLiyYP1zRlOVEduqfYKaX8Px1V20sCT0r8Fn3Y twZg==",
    "To":"Keith Holliday <postmaster@mg.koalatea.io>",
    "Dkim-Signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=gmail.com; s=20161025; h=mime-version:references:in-reply-to:from:date:message-id:subject:to; bh=H+DirZvVUMrZ2UiqIT0bPRTTrE2G+CNDtminyZE79lE=; b=qpAdD10IMrx0i0Tu1JsJ9ZN6CqPAvY3+EavkUhVEcZ05HHqZbqYQvve/Xtihe/QaHg x0IEe6jxmkiHLxlp066D9lpS3AaM8ihFubiFwlvVehkRvmoghN7Q6Q0qH5za29dhO0pj fSbmEOBR1E1P2yQTpnwO2GJpIy38nB9E4KinO6+cVYZJyH3K0dQLtOSjP/dml56iN1Ni 6VMXLRpBqAf7/gG1Tq6GCkU9jIwS2crH8FkwC8ZnpF1b4Q5ANRssvXDhLL5YcJTqBrFD 1QAtIwzyGVAzbU/to1QJAy1DAjNHpEfGM5sp4/7EZc45JnbYEsZtIfAyVWLaDuNlaInT eTqQ==",
    "subject":"Re: Testing",
    "from":"Keith Holliday <keithrholliday@gmail.com>",
    "X-Received":"by 10.36.58.197 with SMTP id m188mr2092002itm.36.1487825396995; Wed, 22 Feb 2017 20:49:56 -0800 (PST)",
    "In-Reply-To":"<CAEqiVfOsEML1EAgmXt=B=a61M0whuqcof4UxbtiVyoxQCbNYMQ@mail.gmail.com>",
    "Date":"Thu, 23 Feb 2017 04:49:46 +0000",
    "Message-Id":"<CAEqiVfM7N7dBa6xjEC5GjZDKp-u0kvsMA_PQmWw4nqRmR8iueA@mail.gmail.com>",
    "Mime-Version":"1.0",
    "Received":[
      "from mail-it0-f51.google.com (mail-it0-f51.google.com [209.85.214.51]) by mxa.mailgun.org with ESMTP id 58b0c9a2.7f2bf429a7f0-smtp-in-n01; Sat, 25 Feb 2017 00:02:42 -0000 (UTC)",
      "by mail-it0-f51.google.com with SMTP id y135so39944744itc.1 for <postmaster@mg.koalatea.io>; Fri, 24 Feb 2017 16:02:42 -0800 (PST)"
    ],
    "message-url":"https://sw.api.mailgun.net/v3/domains/mg.koalatea.io/messages/eyJwIjpmYWxzZSwiayI6IjllOWQxYmM3LTkwMjktNDZiMi1iYmNlLTk0NmM1MzI5NjQ1MSIsInMiOiJjMDdlMzliNjdhIiwiYyI6InRhbmtiIn0=",
    "recipient":"postmaster@mg.koalatea.io",
    "sender":"keithrholliday@gmail.com",
    "X-Mailgun-Incoming":"Yes",
    "X-Gm-Message-State":"AMke39lLhv9kv5juuYAtXgUteR4bAPHKpK1IBPHICErw2wi3f/DJYvmrN6aAktO+FbRssrTqujas2nk6b2hgeg==",
    "message-headers":"[[\"X-Mailgun-Incoming\", \"Yes\"], [\"X-Envelope-From\", \"<keithrholliday@gmail.com>\"], [\"Received\", \"from mail-it0-f51.google.com (mail-it0-f51.google.com [209.85.214.51]) by mxa.mailgun.org with ESMTP id 58b0c9a2.7f2bf429a7f0-smtp-in-n01; Sat, 25 Feb 2017 00:02:42 -0000 (UTC)\"], [\"Received\", \"by mail-it0-f51.google.com with SMTP id y135so39944744itc.1 for <postmaster@mg.koalatea.io>; Fri, 24 Feb 2017 16:02:42 -0800 (PST)\"], [\"Dkim-Signature\", \"v=1; a=rsa-sha256; c=relaxed/relaxed; d=gmail.com; s=20161025; h=mime-version:references:in-reply-to:from:date:message-id:subject:to; bh=H+DirZvVUMrZ2UiqIT0bPRTTrE2G+CNDtminyZE79lE=; b=qpAdD10IMrx0i0Tu1JsJ9ZN6CqPAvY3+EavkUhVEcZ05HHqZbqYQvve/Xtihe/QaHg x0IEe6jxmkiHLxlp066D9lpS3AaM8ihFubiFwlvVehkRvmoghN7Q6Q0qH5za29dhO0pj fSbmEOBR1E1P2yQTpnwO2GJpIy38nB9E4KinO6+cVYZJyH3K0dQLtOSjP/dml56iN1Ni 6VMXLRpBqAf7/gG1Tq6GCkU9jIwS2crH8FkwC8ZnpF1b4Q5ANRssvXDhLL5YcJTqBrFD 1QAtIwzyGVAzbU/to1QJAy1DAjNHpEfGM5sp4/7EZc45JnbYEsZtIfAyVWLaDuNlaInT eTqQ==\"], [\"X-Google-Dkim-Signature\", \"v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20161025; h=x-gm-message-state:mime-version:references:in-reply-to:from:date :message-id:subject:to; bh=H+DirZvVUMrZ2UiqIT0bPRTTrE2G+CNDtminyZE79lE=; b=GJuhwvinY+g2wLieI/Kx/MhqIkE3daYxIMyGG7lrp8rT733Bf7Rt9w6ulHEMLPk34Q L9P3oLQhvRqfPZk9uuwJIKEw1mpfoU0jwCAPwEDxKgosxBbhYwOJr3ROm75HMmuypT42 W1LgTYgXUhWxqKVMWTg9UnweerqljjfcEGH5fNjPruDKu9y2FV6Z+rh1Fehq+1OIfvM8 XrWk/Xd2O7s3BDxADHoSYIVAdAtjNnwBbm5x6o98AajSH++6vFmkpQ/ZuWP+wnW2JDnB Hsn6hVoL1lqkYt5PWx5Fjo+CG38s5IKLiyYP1zRlOVEduqfYKaX8Px1V20sCT0r8Fn3Y twZg==\"], [\"X-Gm-Message-State\", \"AMke39lLhv9kv5juuYAtXgUteR4bAPHKpK1IBPHICErw2wi3f/DJYvmrN6aAktO+FbRssrTqujas2nk6b2hgeg==\"], [\"X-Received\", \"by 10.36.58.197 with SMTP id m188mr2092002itm.36.1487825396995; Wed, 22 Feb 2017 20:49:56 -0800 (PST)\"], [\"Mime-Version\", \"1.0\"], [\"References\", \"<20170223042104.103752.30515.AA032F4C@mg.koalatea.io> <CAEqiVfNjg2WK0zugcn14q_U83i7Pd3fOWpAtw6RnON2MXg48cQ@mail.gmail.com> <CAEqiVfOsEML1EAgmXt=B=a61M0whuqcof4UxbtiVyoxQCbNYMQ@mail.gmail.com>\"], [\"In-Reply-To\", \"<CAEqiVfOsEML1EAgmXt=B=a61M0whuqcof4UxbtiVyoxQCbNYMQ@mail.gmail.com>\"], [\"From\", \"Keith Holliday <keithrholliday@gmail.com>\"], [\"Date\", \"Thu, 23 Feb 2017 04:49:46 +0000\"], [\"Message-Id\", \"<CAEqiVfM7N7dBa6xjEC5GjZDKp-u0kvsMA_PQmWw4nqRmR8iueA@mail.gmail.com>\"], [\"Subject\", \"Re: Testing\"], [\"To\", \"Keith Holliday <postmaster@mg.koalatea.io>\"], [\"Content-Type\", \"multipart/alternative; boundary=\\\"001a11441a1e46a10605492b583f\\\"\"]]",
    "References":"<20170223042104.103752.30515.AA032F4C@mg.koalatea.io> <CAEqiVfNjg2WK0zugcn14q_U83i7Pd3fOWpAtw6RnON2MXg48cQ@mail.gmail.com> <CAEqiVfOsEML1EAgmXt=B=a61M0whuqcof4UxbtiVyoxQCbNYMQ@mail.gmail.com>",
    "Content-Type":"multipart/alternative; boundary=\"001a11441a1e46a10605492b583f\"",
    "Subject":"Re: Testing",
    "timestamp":"1487980963",
    "token":"31ec4e2a24562e21e1ffcf3bb271721f22b8fc53b2fa47d1df",
    "signature":"7227d6e735a4540a6521260b5487cc3905ebc952833ab639ac7f0e26321d2bc9",
    "body-plain":"What iup\r\n\r\nOn Wed, Feb 22, 2017 at 9:47 PM Keith Holliday <keithrholliday@gmail.com>\r\nwrote:\r\n\r\n> Hellllo\r\n>\r\n> On Wed, Feb 22, 2017 at 9:44 PM Keith Holliday <keithrholliday@gmail.com>\r\n> wrote:\r\n>\r\n> Yo, something and stuff\r\n>\r\n>\r\n> On Wed, Feb 22, 2017 at 9:21 PM Keith Holliday <postmaster@mg.koalatea.io>\r\n> wrote:\r\n>\r\n> Yo, wah tup\r\n>\r\n>\r\n",
    "body-html":"<div dir=\"ltr\">What iup</div><br><div class=\"gmail_quote\"><div dir=\"ltr\">On Wed, Feb 22, 2017 at 9:47 PM Keith Holliday <<a href=\"mailto:keithrholliday@gmail.com\">keithrholliday@gmail.com</a>> wrote:<br></div><blockquote class=\"gmail_quote\" style=\"margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex\"><div dir=\"ltr\" class=\"gmail_msg\">Hellllo</div><br class=\"gmail_msg\"><div class=\"gmail_quote gmail_msg\"><div dir=\"ltr\" class=\"gmail_msg\">On Wed, Feb 22, 2017 at 9:44 PM Keith Holliday <<a href=\"mailto:keithrholliday@gmail.com\" class=\"gmail_msg\" target=\"_blank\">keithrholliday@gmail.com</a>> wrote:<br class=\"gmail_msg\"></div><blockquote class=\"gmail_quote gmail_msg\" style=\"margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex\"><div dir=\"ltr\" class=\"gmail_msg\">Yo, something and stuff<div class=\"gmail_msg\"><br class=\"gmail_msg\"></div></div><br class=\"gmail_msg\"><div class=\"gmail_quote gmail_msg\"><div dir=\"ltr\" class=\"gmail_msg\">On Wed, Feb 22, 2017 at 9:21 PM Keith Holliday <<a href=\"mailto:postmaster@mg.koalatea.io\" class=\"gmail_msg\" target=\"_blank\">postmaster@mg.koalatea.io</a>> wrote:<br class=\"gmail_msg\"></div><blockquote class=\"gmail_quote gmail_msg\" style=\"margin:0 0 0 .8ex;border-left:1px #ccc solid;padding-left:1ex\">Yo, wah tup<br class=\"gmail_msg\">\r\n</blockquote></div></blockquote></div></blockquote></div>\r\n",
    "stripped-html":"<html><head></head><body><div dir=\"ltr\">What iup</div><br></body></html>",
    "stripped-text":"What iup",
    "stripped-signature":""
  };
  let userdata;

  // before(function (done) {
  // });

  afterEach(function(done) {
    Contact.remove({}, function() {
      done();
    });
  });

  it('stores a received message', (done) => {
    request(server)
      .post('/api/v1/contacts/message-receive')
      .send(messageInfo)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.exist;
        let contact = res.body.data;
        contact.email.should.equal(messageInfo['sender']);
        contact.message.should.equal(messageInfo['stripped-text']);
        contact.messageId.should.equal(messageInfo['Message-Id']);
        contact.inReplyTo.should.equal(messageInfo['In-Reply-To']);
        contact.subject.should.equal(messageInfo['Subject']);
        contact.fromEmailService.should.be.true;
        contact.fromEmailServiceDetails.should.eql(messageInfo);
        done();
      });
  });
});
