var nconf = require('nconf');
var jwt    = require('jsonwebtoken');
let User = require('../models/user');

var middleware = {}

// route middleware to make sure a user is logged in
middleware.isLoggedIn = function (req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

middleware.hasValidToken = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }

  jwt.verify(token, nconf.get('JWT_SECRET'), function(err, decoded) {
    if (err) {
      return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
    } else {
      let userDoc = decoded._doc;
      User.findById(userDoc._id).exec()
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => {
          return res.status(403).json({err});
        });
    }
  });
}

module.exports = middleware;
