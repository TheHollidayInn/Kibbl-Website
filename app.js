require('dotenv').config();

// @TODO: Only dev
// const opbeat = require('opbeat').start({
//   appId: process.env.OPBEAT_APPID,
//   organizationId: process.env.OPBEAT_ORG_ID,
//   secretToken: process.env.OPBEAT_SECRET_TOKEN,
// });

var express = require('express');
const cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var passport = require('passport');
// var session  = require('express-session');
// var MongoStore = require('connect-mongo')(session);

require('./libraries/passport')(passport);

var app = express();
// @TODO: Add to prod only
// app.use(opbeat.middleware.express())
app.use(cors());
app.use(compression());
app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/static/js', express.static(__dirname + '/client/dist/static/js'));
app.use('/static/css', express.static(__dirname + '/client/dist/static/css'));
app.use('/static/img', express.static(__dirname + '/client/dist/static/img'));
app.use(express.static(__dirname + '/client/dist'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(session({
//     secret: process.env.DB_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     maxAge: new Date(Date.now() + 3600000),
//     store: new MongoStore(
//         {mongooseConnection: mongoose.connection},
//         function(err){
//             console.log(err || 'connect-mongodb setup ok');
//         })
// }));

// var oneWeek = 604800000;
// app.use(express.static(path.join(__dirname, 'public')));

// required for passport
// app.use(session({ secret: process.env.DB_PASSPORT_SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

//@TODO: Move middleware
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// set up a route to redirect http to https
// app.all('*', (req, res) => {
//   if (req.headers["x-forwarded-proto"] !== "https") {
//     res.redirect('https://' + req.hostname + req.url); // express 4.x
//   }
// });

const routes = require('./routes/index');
const users = require('./routes/users');
const pets = require('./routes/pets');
const favorites = require('./routes/favorites');
const contacts = require('./routes/contact');
const shelters = require('./routes/shelters');
const events = require('./routes/events');
const volunteer = require('./routes/volunteer');
const notifications = require('./routes/notifications');
const comments = require('./routes/comments');
const feedback = require('./routes/feedback');
const forgotPassword = require('./routes/forgot-password');
const reset = require('./routes/reset');
const emailSubscribers = require('./routes/emailSubscribers');

app.use('/', routes);
app.use('/api/v1/users', users);
app.use('/api/v1/pets', pets);
app.use('/api/v1/favorites', favorites);
app.use('/api/v1/contacts', contacts);
app.use('/api/v1/shelters', shelters);
app.use('/api/v1/events', events);
app.use('/api/v1/volunteer', volunteer);
app.use('/api/v1/notifications', notifications);
app.use('/api/v1/comments', comments);
app.use('/api/v1/feedback', feedback);
app.use('/api/v1/forgot-password', forgotPassword);
app.use('/api/v1/reset', reset);
app.use('/api/v1/subscriptions', emailSubscribers);

let MONGO_URL = process.env.DB_DEV_URL;
if (process.env.NODE_ENV === 'production') {
  MONGO_URL = process.env.DB_URL;
}
mongoose.connect(MONGO_URL, { useNewUrlParser: true });

// catch 404 and forward to error handler
// @TODO: how to ignore angular 404s This should only handle api 404s
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  let err = {};
  err.status = 200;
  // err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // return res.sendFile('./client/dist/index.html', {root: './'});
    return res.status(err.status).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  // @TODO: Check for 500 ? opbeat.captureError(err);
  res.status(err.status || 500);
  // return res.sendFile('./client/dist/index.html', {root: './'});
  return res.status(err.status).json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
