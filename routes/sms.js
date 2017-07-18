var twilio = require('twilio');

var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
    if (req.body.Body..lowerCase() == 'apple') {
      twiml.message('https://itunes.apple.com/us/app/kibbl/id1241433983?mt=8');
    } else if(req.body.Body == 'google') {
      twiml.message('https://play.google.com/store/apps/details?id=com.thehollidayinn.kibbl&hl=en');
    } else {
      //twiml.message('No Body param match, Twilio sends this in the request to your server.');
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});
