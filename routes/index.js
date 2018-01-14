var express = require('express');
var router = express.Router();

var passport = require('passport');

// var stripe = require('stripe')(process.env.STRIPE_SECRET);
var jwt    = require('jsonwebtoken');
const Mailchimp = require('mailchimp-api-v3');
const mailchimpApi = new Mailchimp(process.env.MAIL_CHIMP_API);

var User = require('../models/user');
var Event = require('../models/events');
var Shelter = require('../models/shelters');
var Pet = require('../models/pets');
var VolunteerOpportunity = require('../models/volunteerOpportunity');

router.get('/api/v1/latest', function(req, res) {
  let events = [];
  let shelters = [];
  let pets = [];
  let volunteerOpportunity = [];
  let limit = 3;

  Event.find().sort({createdAt: -1}).limit(limit).exec()
    .then(function (eventsFound) {
      events = eventsFound;

      return Shelter.find().sort({createdAt: -1}).limit(limit).exec();
    })
    .then(function (sheltersFound) {
      shelters = sheltersFound;

      return Pet.find().sort({createdAt: -1}).limit(limit).exec();
    })
    .then(function (petsFound) {
      pets = petsFound;

      return VolunteerOpportunity.find().sort({createdAt: -1}).limit(limit).exec();
    })
    .then(function(volunteersFound) {
      volunteerOpportunity = volunteersFound;

      return res.status(200).json({
        data: {
          events,
          shelters,
          pets,
          volunteerOpportunity
        },
      });
    })
    .catch(function(err) {
      console.log(err)
      return res.status(400).json({message: err});
    });
});

router.post('/api/v1/register', function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      message: 'You must supply an email and password',
    });
  }

  User
    .findOne({'local.email': email}).exec()
    .then(function (user) {
      if (user) {
        throw new Error('User already exists.');
      }

      var newUser = new User();
      newUser.local.email = email;
      newUser.local.password = newUser.generateHash(password);

      // Subscribe to automation
      mailchimpApi.post('/lists/639ce8bf75/members', {
        email_address : email,
        status : 'subscribed',
      });

      if (req.headers && req.headers['user-agent']) newUser.registeredOn = req.headers['user-agent'];

      return newUser.save()
    })
    .then(function (userSaved) {
      let token =  jwt.sign(userSaved.toObject(), process.env.JWT_SECRET, { expiresIn: '40000h' });

      return res.status(201).json({
        user: userSaved,
        token: token,
      });
    })
    .catch(function (err) {
      if (err.message === 'User already exists.') {
        return res.status(401).json({
          message: err.message,
        });
      }
      return res.status(400).json({err: err});
    });
});

router.post('/api/v1/login', function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      message: 'You must supply an email and password',
    });
  }

  var user = User
    .findOne({'local.email': email}).exec()
    .then(function (user) {
      if (!user) return res.status(404).json({message: 'User not found.'});

      if (!user.validPassword(password)) return res.status(401).json({message: 'Password is incorrect.'});

      let token =  jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: '40000h' });

      return res.status(200).json({
        token: token,
      });
    })
    .catch(function (err) {
      return res.status(400).json({err: err});
    });
});

router.post('/api/v1/logout', function(req, res) {
    req.logout();
    res.status(200).json('');
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/'
  })
);

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
      successRedirect : '/',
      failureRedirect : '/'
  })
);

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
          successRedirect : '/',
          failureRedirect : '/'
  })
);

function authenticateSocialNetwork (network, accessToken) {
  return new Promise((resolve, reject) => {
    passport._strategies[network].userProfile(accessToken, (err, profile) => {
      if (err) {
        reject(err);
      } else {
        resolve(profile);
      }
    });
  });
}

router.post('/api/v1/auth/social', function (req, res) {
  let network = req.body.network;
  let accessToken = req.body.accessToken;

  authenticateSocialNetwork (network, accessToken)
    .then(function (profile) {
      // @TODO: Generalize for other
      return User.findOne({ 'facebook.id' : profile.id })
        .then(function(user) {
          var newUser;

          if (user) {
            newUser = user;
          } else {
            newUser = new User();
            // Subscribe to automation
            mailchimpApi.post('/lists/639ce8bf75/members', {
              email_address : profile.emails[0].value,
              status : 'subscribed',
            });
            if (req.headers && req.headers['user-agent']) newUser.registeredOn = req.headers['user-agent'];
          }

          newUser.facebook.id    = profile.id; // set the users facebook id
          newUser.facebook.token = accessToken; // we will save the token that facebook provides to the user
          newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
          newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

          return newUser.save();
        });
    })
    .then(function(newUser) {
      // @TODO: handle expiring tokens
      let token =  jwt.sign(newUser.toObject(), process.env.JWT_SECRET, { expiresIn: '40000h' });

      return res.status(200).json({
        token: token,
      });
    })
    .catch(function (err) {
      console.log(err)
      res.status(403).send({err: err});
    });
});

// router.post('/charge', Middleware.isLoggedIn, function(req, res, next) {
//   stripe.customers.create({
//     email: req.user.local.email,
//     source: req.body.stripeToken,
//   }).then(function(customer) {
//     return stripe.charges.create({
//       amount: req.body.amount,
//       currency: 'usd',
//       customer: customer.id
//     });
//   }).then(function(charge) {
//     // Donations
//     //@TODO: Log the donation to model
//     //@TODO: Send email
//     // res.render('index', { message: 'Your donation as been sent!', status: 'Success!' });
//   }).catch(function(err) {
//     // Deal with an error
//   });
// });

module.exports = router;
