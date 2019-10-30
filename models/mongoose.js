const mongoose = require('mongoose');

function configureMongoose() {
  const { NODE_ENV, DB_URL, DB_DEV_URL } = process.env;
  const MONGO_URL = NODE_ENV === 'production' ? DB_URL : DB_DEV_URL;
  mongoose.connect(MONGO_URL, { useNewUrlParser: true });
}

module.exports = { configureMongoose };
