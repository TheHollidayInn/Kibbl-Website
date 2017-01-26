var nconf = require('nconf');
var express = require('express');
var router = express.Router();

var passport = require('passport');
var Middleware = require('../middleware');

var stripe = require('stripe')(nconf.get('stripe:secretKey'));
var jwt    = require('jsonwebtoken');

var Donations = require('../models/donations');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kibbl' });
});

router.get('/login', function(req, res) {
  res.render('login.jade', { message: req.flash('loginMessage') });
});

router.post('/login-angular', passport.authenticate('local-login'), function(req, res) { res.send(req.user); });

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

router.get('/register', function(req, res) {
  res.render('register.jade', { message: req.flash('signupMessage') });
});

router.post('/register', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/register', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

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

  // @TODO: Add validation

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

router.get('/profile', Middleware.isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

// =====================================
// TWITTER ROUTES ======================
// =====================================
// route for twitter authentication and login
router.get('/auth/twitter', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
        }));

router.post('/charge', Middleware.isLoggedIn, function(req, res, next) {
  console.log(req.body)
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
    console.log(charge)
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


module.exports = router;
