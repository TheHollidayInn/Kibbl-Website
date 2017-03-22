var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var MongoStore = require('connect-mongo')(session);

var fs = require('fs'),
  nconf = require('nconf');
  nconf.argv()
   .env()
   .file({ file: './config.json' });

var stripe = require('stripe')(nconf.get('stripe:secretKey'));

require('./config/passport')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: nconf.get("db:SESSION_SECRET"),
    resave: false,
    saveUninitialized: false,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore(
        {mongooseConnection: mongoose.connection},
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        })
}));
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: nconf.get('db:PASSPORT_SESSION_SECRET') })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

//@TODO: Move middleware
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

var routes = require('./routes/index');
// var users = require('./routes/users');
var pets = require('./routes/pets');
var favorites = require('./routes/favorites');
var contacts = require('./routes/contact');
var shelters = require('./routes/shelters');
var events = require('./routes/events');
var volunteer = require('./routes/volunteer');
var notifications = require('./routes/notifications');
let comments = require('./routes/comments');

app.use('/', routes);
// app.use('/api/v1/users', users);
app.use('/api/v1/pets', pets);
app.use('/api/v1/favorites', favorites);
app.use('/api/v1/contacts', contacts);
app.use('/api/v1/shelters', shelters);
app.use('/api/v1/events', events);
app.use('/api/v1/volunteer', volunteer);
app.use('/api/v1/notifications', notifications);
app.use('/api/v1/comments', comments);

mongoose.connect(nconf.get('db:URL'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err)
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
    return res.render('index', { title: 'Kibbl' });
    return res.status(err.status).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
  return res.render('index', { title: 'Kibbl' });
  return res.status(err.status).json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
