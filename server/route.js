const routes = require('../routes/index');
const users = require('../routes/users');
const pets = require('../routes/pets');
const favorites = require('../routes/favorites');
const contacts = require('../routes/contact');
const shelters = require('../routes/shelters');
const events = require('../routes/events');
const volunteer = require('../routes/volunteer');
const notifications = require('../routes/notifications');
const comments = require('../routes/comments');
const feedback = require('../routes/feedback');
const forgotPassword = require('../routes/forgot-password');
const reset = require('../routes/reset');
const emailSubscribers = require('../routes/emailSubscribers');

function configureRoutes(app) {
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
}

module.exports = { configureRoutes };
