const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user');

function setUpFacebook(passport) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    passReqToCallback: true,
    profileFields: ['id', 'emails', 'name'],
  }, (req, token, refreshToken, profile, done) => {
    process.nextTick(async () => {
      if (req.user) {
        const { user } = req;
        user.facebook.id = profile.id;
        user.facebook.token = token;
        user.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
        user.facebook.email = profile.emails[0].value;
        await user.save();
        return done(null, user);
      }

      const user = await User.findOne({ 'facebook.id': profile.id });
      if (user) return done(null, user);

      const newUser = new User();
      newUser.facebook.id = profile.id;
      newUser.facebook.token = token;
      newUser.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
      newUser.facebook.email = profile.emails[0].value;
      await newUser.save();
      return done(null, newUser);
    });
  }));
}

function setupLocalSignup(passport) {
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
  (req, email, password, done) => {
    process.nextTick(async () => {
      const user = await User.findOne({ 'local.email': email }).exec();
      if (user) return done(null, user);

      const newUser = new User();
      newUser.local.email = email;
      newUser.local.password = newUser.generateHash(password);
      await newUser.save();
      return done(null, newUser);
    });
  }));
}

function setupLocalLogin(passport) {
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
  (req, email, password, done) => {
    User.findOne({ 'local.email': email })
      .then((user) => {
        if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'));
        if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        return done(null, user);
      })
      .catch((err) => done(err));
  }));
}

function configurePassPort(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  setupLocalSignup(passport);
  setupLocalLogin(passport);

  if (process.env.FACEBOOK_CLIENT_ID) setUpFacebook(passport);
}

module.exports = configurePassPort;
