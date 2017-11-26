var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');

var nconf = require('nconf');

// expose this function to our app using module.exports
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ 'local.email' :  email })
        .then(function(user) {
          if (user) return;

          var newUser = new User();
          newUser.local.email    = email;
          newUser.local.password = newUser.generateHash(password);
          return newUser.save();
        })
        .then(function(newUser) {
          if (newUser) return done(null, newUser);
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        })
        .catch(function (err) {
          return done(err);
        });
    });
  }));

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
      User.findOne({ 'local.email' :  email })
        .then(function(user) {
          if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'));

          if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

          return done(null, user);
        })
        .catch(function (err) {
          return done(err);
        });
  }));

  passport.use(new FacebookStrategy({
    clientID        : nconf.get('facebookAuth_clientID'),
    clientSecret    : nconf.get('facebookAuth:clientSecret'),
    callbackURL     : nconf.get('facebookAuth:callbackURL'),
    passReqToCallback : true,
    profileFields: ['id', 'emails', 'name'],
  },
  function(req, token, refreshToken, profile, done) {
    process.nextTick(function() {
      if (req.user) {
        var user = req.user;
        user.facebook.id    = profile.id;
        user.facebook.token = token;
        user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        user.facebook.email = profile.emails[0].value;

        return user.save()
          .then(function() {
            return done(null, user);
          })
          .catch(function (err) {
            throw err;
          });
      }

      return User.findOne({ 'facebook.id' : profile.id })
        .then(function(user) {
            var newUser          = new User();

            newUser.facebook.id    = profile.id; // set the users facebook id
            newUser.facebook.token = token; // we will save the token that facebook provides to the user
            newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            return newUser.save();
        })
        .then(function(newUser) {
          if (newUser) return done(null, newUser);
          return done(null, user);
        })
        .catch(function (err) {
            return done(err);
        });
    });
  }));

  // passport.use(new TwitterStrategy({
  //   consumerKey     : nconf.get('twitterAuth:consumerKey'),
  //   consumerSecret    : nconf.get('twitterAuth:consumerSecret'),
  //   callbackURL     : nconf.get('twitterAuth:callbackURL'),
  //   passReqToCallback : true
  // },
  // function(req, token, tokenSecret, profile, done) {
  //   process.nextTick(function() {
  //     if (req.user) {
  //       var user          = req.user;
  //
  //       user.twitter.id          = profile.id;
  //       user.twitter.token       = token;
  //       user.twitter.username    = profile.username;
  //       user.twitter.displayName = profile.displayName;
  //
  //       return user.save()
  //         .then(function() {
  //           return done(null, user);
  //         })
  //         .catch(function (err) {
  //           throw err;
  //         });
  //     }
  //
  //     return User.findOne({ 'twitter.id' : profile.id })
  //       .then(function(user) {
  //           var newUser          = new User();
  //
  //           newUser.twitter.id          = profile.id;
  //           newUser.twitter.token       = token;
  //           newUser.twitter.username    = profile.username;
  //           newUser.twitter.displayName = profile.displayName;
  //
  //           return newUser.save();
  //       })
  //       .then(function(newUser) {
  //         if (newUser) return done(null, newUser);
  //         return done(null, user);
  //       })
  //       .catch(function (err) {
  //           return done(err);
  //       });
  //   });
  // }));
  //
  //
  // passport.use(new GoogleStrategy({
  //   clientID        : nconf.get('googleAuth:clientID'),
  //   clientSecret    : nconf.get('googleAuth:clientSecret'),
  //   callbackURL     : nconf.get('googleAuth:callbackURL'),
  //   passReqToCallback : true,
  // },
  // function(req, token, refreshToken, profile, done) {
  //     process.nextTick(function() {
  //       if (req.user) {
  //         var user          = req.user;
  //
  //         user.google.id    = profile.id;
  //         user.google.token = token;
  //         user.google.name  = profile.displayName;
  //         user.google.email = profile.emails[0].value; // pull the first email
  //
  //         return user.save()
  //           .then(function() {
  //             return done(null, user);
  //           })
  //           .catch(function (err) {
  //             throw err;
  //           });
  //       }
  //
  //       return User.findOne({ 'google.id' : profile.id })
  //         .then(function(user) {
  //             var newUser          = new User();
  //
  //             newUser.google.id    = profile.id;
  //             newUser.google.token = token;
  //             newUser.google.name  = profile.displayName;
  //             newUser.google.email = profile.emails[0].value; // pull the first email
  //
  //             return newUser.save();
  //         })
  //         .then(function(newUser) {
  //           if (newUser) return done(null, newUser);
  //           return done(null, user);
  //         })
  //         .catch(function (err) {
  //             return done(err);
  //         });
  //     });
  //   }));

};
