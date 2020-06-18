/**
 * Module dependencies.
 */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import expressStatusMonitor from 'express-status-monitor';
import CreateError from 'http-errors';
import morgan from 'morgan';

import connectDatabase from '../db';
import passportConfig from '../config/passport';
import routes from '../src/routes';
import { response, errorHandler } from '../middleware';

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
connectDatabase();

/**
 * Express configuration.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: '*',
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use(response);

app.use(helmet());

app.use(compression());

app.use(
  expressStatusMonitor({
    title: 'UTE-Exchange Health',
    path: '/health-check',
  }),
);

app.use(morgan('dev'));

app.disable('x-powered-by');

/**
 * App router.
 */
app.use('/api/v1', routes);

// API docs endpoint
app.use('/apidoc', express.static('./apidoc/output'));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new CreateError.NotFound('API Not Found!'));
});

/**
 * Error handler.
 */
app.use(errorHandler);

module.exports = app;
