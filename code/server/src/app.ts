import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import createStore from 'express-mysql-session';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';

import errorHandler from './helpers/errorHandler';
import router from './actions/router';
import { Logger } from './helpers/logger';
import { ACCESS_LOG } from './constants/logs';
import { pool } from './database/connection';

dotenv.config();

// Initialize the server
const app = express();

// Get data from raw HTTP requests and json bodies to request object
app.use(bodyParser.json({ limit: '3mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '3mb' }));

// Initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// Initialize session store and session middleware
// @ts-ignore: Property 'default' is missing in type (some bug in types config of express-mysql-session)
const MySQLStore = createStore(session);
const sessionStore = new MySQLStore({}, pool);
const YEAR_MILLISECONDS = 31540000000;
app.use(session({
  store: sessionStore,
  name: 'user_sid',
  secret: process.env.SESSION_SECRET || 'test',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: YEAR_MILLISECONDS,
    expires: (() => {
      const date = new Date();
      date.setTime(date.getTime() + YEAR_MILLISECONDS);
      return date;
    })(),
  },
}));

// Setup access logging
app.use(morgan(':remote-addr - :remote-user ":method :url" :status :response-time ms', {
  stream: {
    write: (str: string) => Logger(ACCESS_LOG, str),
  },
}));

// Setup CORS policy
app.use(cors(
  process.env.DEBUG === 'true'
    ? {
      origin: `http://localhost:${process.env.PORT === '8080' ? 8081 : 8080}`,
      credentials: true,
      optionsSuccessStatus: 200,
    }
    : {}
));
app.options('*', cors());

// Serve static assets
app.use(express.static(path.resolve('./dist')));
app.use(express.static(path.resolve('./uploads')));

// Checks if user's cookie is still saved in the browser without associated user, then clears the cookie
app.use((req, res, next) => {
  if (req.cookies.user_sid && (req.session && !req.session.user)) {
    res.clearCookie('user_sid');
  }
  next();
});

// Setup routing
app.use(router());

// Add silent error handler
app.use(errorHandler);

export default app;
