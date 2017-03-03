var nconf = require('nconf');
var express = require('express');
let fs = require('fs');
var router = express.Router();

var passport = require('passport');
var Middleware = require('../middleware');

var stripe = require('stripe')(nconf.get('stripe:secretKey'));
var jwt    = require('jsonwebtoken');

var Donations = require('../models/donations');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kibbl' });
});

router.get('/login', function(req, res) {
  res.render('login.jade', { message: req.flash('loginMessage') });
});

router.post('/login-angular', passport.authenticate('local-login'), function(req, res) { res.send(req.user); });

router.get('/register', function(req, res) {
  res.render('register.jade', { message: req.flash('signupMessage') });
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

      return newUser.save()
    })
    .then(function (userSaved) {
      let token =  jwt.sign(userSaved, nconf.get('JWT_SECRET'), { expiresIn: '1h' });

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

      let token =  jwt.sign(user, nconf.get('JWT_SECRET'), { expiresIn: '1h' });

      return res.status(200).json({
        token: token,
      });
    })
    .catch(function (err) {
      return res.status(400).json({err: err});
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
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

      return User.findOne({ 'facebook.id' : profile.id })
        .then(function(user) {
          var newUser;

          if (user) {
            newUser = user;
          } else {
            newUser = new User();
          }

          newUser.facebook.id    = profile.id; // set the users facebook id
          newUser.facebook.token = accessToken; // we will save the token that facebook provides to the user
          newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
          // newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

          return newUser.save();
        });
    })
    .then(function(newUser) {
      let token =  jwt.sign(newUser, nconf.get('JWT_SECRET'), { expiresIn: '1h' });

      return res.status(200).json({
        token: token,
      });
    })
    .catch(function (err) {
      res.status(403).send({err: err});
    });
});

router.post('/charge', Middleware.isLoggedIn, function(req, res, next) {
  stripe.customers.create({
    email: req.user.local.email,
    source: req.body.stripeToken,
  }).then(function(customer) {
    return stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      customer: customer.id
    });
  }).then(function(charge) {
    // Donations
    //@TODO: Log the donation to model
    //@TODO: Send email
    res.render('index', { message: 'Your donation as been sent!', status: 'Success!' });
  }).catch(function(err) {
    // Deal with an error
  });
});

//Static
router.get('/pet-detail.html', function(req, res, next) {
  res.render('pet-detail');
});

router.get('/pet-list.html', function(req, res, next) {
  res.render('pet-list');
});

router.get('/favorite-list.html', function(req, res, next) {
  res.render('favorite-list');
});

router.get('/volunteer-list.html', function(req, res, next) {
  res.render('volunteer/volunteer-list');
});

router.get('/volunteer-detail.html', function(req, res, next) {
  res.render('volunteer/volunteer-detail');
});

router.get('/event-list.html', function(req, res, next) {
  res.render('events/event-list');
});

router.get('/event-detail.html', function(req, res, next) {
  res.render('events/event-detail');
});

router.get('/*', function(req, res, next) {
  res.render('index', { title: 'Kibbl' });
});

// router.get('*', function(req, res, next) {
//   let url = req.url;
//   url = url.split('.');
//   url = url[0].split('/');

//   let path = `../views/${url[1]}.jade`;
//   if (!fs.existsSync(path)) return next();
//   res.render(url[1]);
// });


module.exports = router;
