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

    // passport.use(new FacebookStrategy({
    //
    //     // pull in our app id and secret from our auth.js file
    //     clientID        : configAuth.facebookAuth.clientID,
    //     clientSecret    : configAuth.facebookAuth.clientSecret,
    //     callbackURL     : configAuth.facebookAuth.callbackURL,
    //     passReqToCallback : true
    //
    // },
    //
    // // facebook will send back the token and profile
    // function(req, token, refreshToken, profile, done) {
    //
    //     // asynchronous
    //     process.nextTick(function() {
    //       if (!req.user) {
    //         // find the user in the database based on their facebook id
    //         User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
    //
    //             // if there is an error, stop everything and return that
    //             // ie an error connecting to the database
    //             if (err)
    //                 return done(err);
    //
    //             // if the user is found, then log them in
    //             if (user) {
    //                 return done(null, user); // user found, return that user
    //             } else {
    //                 // if there is no user found with that facebook id, create them
    //                 var newUser            = new User();
    //
    //                 // set all of the facebook information in our user model
    //                 newUser.facebook.id    = profile.id; // set the users facebook id
    //                 newUser.facebook.token = token; // we will save the token that facebook provides to the user
    //                 newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
    //                 newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
    //
    //                 // save our user to the database
    //                 newUser.save(function(err) {
    //                     if (err)
    //                         throw err;
    //
    //                     // if successful, return the new user
    //                     return done(null, newUser);
    //                 });
    //             }
    //
    //         });
    //       } else {
    //         // user already exists and is logged in, we have to link accounts
    //         var user            = req.user; // pull the user out of the session
    //
    //         // update the current users facebook credentials
    //         user.facebook.id    = profile.id;
    //         user.facebook.token = token;
    //         user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
    //         user.facebook.email = profile.emails[0].value;
    //
    //         // save the user
    //         user.save(function(err) {
    //             if (err)
    //                 throw err;
    //             return done(null, user);
    //         });
    //       }
    //     });
    //
    // }));

    // passport.use(new TwitterStrategy({
    //   consumerKey     : configAuth.twitterAuth.consumerKey,
    //   consumerSecret  : configAuth.twitterAuth.consumerSecret,
    //   callbackURL     : configAuth.twitterAuth.callbackURL,
    //   passReqToCallback : true
    // },
    // function(req, token, tokenSecret, profile, done) {
    //     // make the code asynchronous
    //   // User.findOne won't fire until we have all our data back from Twitter
    //   process.nextTick(function() {
    //     if (!req.user) {
    //       User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
    //
    //           // if there is an error, stop everything and return that
    //           // ie an error connecting to the database
    //           if (err)
    //               return done(err);
    //
    //           // if the user is found then log them in
    //           if (user) {
    //               return done(null, user); // user found, return that user
    //           } else {
    //               // if there is no user, create them
    //               var newUser                 = new User();
    //
    //               // set all of the user data that we need
    //               newUser.twitter.id          = profile.id;
    //               newUser.twitter.token       = token;
    //               newUser.twitter.username    = profile.username;
    //               newUser.twitter.displayName = profile.displayName;
    //
    //               // save our user into the database
    //               newUser.save(function(err) {
    //                   if (err)
    //                       throw err;
    //                   return done(null, newUser);
    //               });
    //           }
    //       });
    //     } else {
    //       var user                 = req.user;
    //
    //       // set all of the user data that we need
    //       user.twitter.id          = profile.id;
    //       user.twitter.token       = token;
    //       user.twitter.username    = profile.username;
    //       user.twitter.displayName = profile.displayName;
    //
    //       // save our user into the database
    //       user.save(function(err) {
    //           if (err)
    //               throw err;
    //           return done(null, user);
    //       });
    //     }
    //   });
    // }));
    //

    passport.use(new GoogleStrategy({
      clientID        : nconf.get('googleAuth:clientID'),
      clientSecret    : nconf.get('googleAuth:clientSecret'),
      callbackURL     : nconf.get('googleAuth:callbackURL'),
      passReqToCallback : true,
    },
    function(req, token, refreshToken, profile, done) {
      process.nextTick(function() {
        if (req.user) {
          var user          = req.user;

          user.google.id    = profile.id;
          user.google.token = token;
          user.google.name  = profile.displayName;
          user.google.email = profile.emails[0].value; // pull the first email

          return user.save()
            .then(function() {
              return done(null, user);
            })
            .catch(function (err) {
              throw err;
            });
        }

        return User.findOne({ 'google.id' : profile.id })
          .then(function(user) {
              var newUser          = new User();

              newUser.google.id    = profile.id;
              newUser.google.token = token;
              newUser.google.name  = profile.displayName;
              newUser.google.email = profile.emails[0].value; // pull the first email

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
};
