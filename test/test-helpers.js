const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

after(done => {
  mongoose.connection.close();
  done();
});
