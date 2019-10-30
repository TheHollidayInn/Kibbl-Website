const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const preRender = require('prerender-node');
const passport = require('passport');

const configPassport = require('../libraries/passport');

function connectMiddleware(app) {
  configPassport(passport);

  app.use(cors());
  app.use(compression());
  app.use(preRender.set('prerenderToken', process.env.PRERENDER_TOKEN));
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  // Attach user
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
}

function configureErrorHandlingMiddleware(app) {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = {};
    err.status = 200;
    next(err);
  });


  // development error handler
  if (app.get('env') === 'development') {
    app.use((err, req, res) => {
      res.status(err.status || 500);
      return res.status(err.status).json({
        message: err.message,
        error: err,
      });
    });
  }

  // production error handler
  app.use((err, req, res) => {
    res.status(err.status || 500);
    return res.status(err.status).json({
      message: err.message,
      error: {},
    });
  });

}

module.exports = { connectMiddleware, configureErrorHandlingMiddleware };
