/**
 * Module dependencies.
 */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import CreateError from 'http-errors';
import morgan from 'morgan';

import dbConnection, { db } from '../db';
import passport from '../config/passport';
import schema from '../src/schema';
import routes from '../src/router';
import { response, errorHandler } from '../middleware';
import extractToken from '../utils/extractToken';
import verifyToken from '../utils/verifyToken';
import config from '../config';

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
dbConnection();

/**
 * Express configuration.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(config.COOKIE_SECRET));

app.use(
  cors({
    credentials: true,
    allowedHeaders: '*',
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(response);

app.use(helmet());

app.use(compression());

/**
 *  Initialize Apollo Server.
 */
const server = new ApolloServer({
  schema,
  context: async ({ req, ...rest }) => {
    const token = extractToken(req);

    const decoded = verifyToken(token);

    const user = decoded.id && (await db.Users.findById(decoded.id));

    return { req, ...rest, db, user };
  },
  playground: {
    settings: {
      'request.credentials': 'include',
      'schema.polling.enable': false,
    },
  },
});

server.applyMiddleware({ app });

/**
 * RESTfull API.
 */
app.use(morgan('dev'));

app.use('/api/v1', routes);

// API docs endpoint
app.use('/apidoc', express.static('./apidoc/output'));

// Catch 404 and forward to error handler
app.use((req, res, next) => next(new CreateError.NotFound('API Not Found!')));

app.disable('x-powered-by');

/**
 * Error handler.
 */
app.use(errorHandler);

module.exports = app;
