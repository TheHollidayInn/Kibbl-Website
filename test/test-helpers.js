var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var db;
var User = require("../models/user");

// before(function(done)
//   // @TODO: We need to use the test db
//   // db = mongoose.connect('mongodb://localhost/test');
//   done();
// });

after(function(done) {
  User.remove({}).exec()
    .then(function(result) {
      mongoose.connection.close();
      done();
    });
});
