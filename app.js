require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const { connectMiddleware, configureErrorHandlingMiddleware } = require('./server/middleware');
const { configureRoutes } = require('./server/route');
const { configureMongoose } = require('./models/mongoose');

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
connectMiddleware(app);
configureRoutes(app);
configureErrorHandlingMiddleware(app);

configureMongoose();

module.exports = app;
