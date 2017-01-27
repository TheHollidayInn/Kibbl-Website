var nconf = require('nconf');
var jwt    = require('jsonwebtoken');

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
      return res.json({ success: false, message: 'Failed to authenticate token.' });
    } else {
      req.user = decoded._doc;
      next();
    }
  });
}

module.exports = middleware;
