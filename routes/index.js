var express = require('express');
var router = express.Router();

var passport = require('passport');
var Middleware = require('../middleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kibbl' });
});


router.get('/login', function(req, res) {
  res.render('login.jade', { message: req.flash('loginMessage') });
});

// process the login form
// router.post('/login', do all our passport stuff here);
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

router.get('/profile', Middleware.isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
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
