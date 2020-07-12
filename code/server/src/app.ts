import express from 'express';
import bodyParser  from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';

import errorHandler from './helpers/errorHandler';
import router from './actions/router';
import { Logger } from './helpers/logger';
import { ACCESS_LOG } from './constants/logs';

const config = dotenv.config();

// Initialize the server
const app = express();

// Get data from raw HTTP requests and json bodies to request object
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

app.use(session({
  name: 'user_sid',
  secret: config.parsed && config.parsed.SESSION_SECRET || 'test',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000
  }
}));

// Setup access logging
app.use(morgan(':remote-addr - :remote-user ":method :url" :status :response-time ms', {
  stream: {
    write: (str: string) => Logger(ACCESS_LOG, str),
  },
}));

// Setup CORS policy
app.use(cors(
  config.parsed && config.parsed.DEBUG
    ? {
      origin: 'http://localhost:8081',
      credentials: true,
      optionsSuccessStatus: 200
    }
    : {}
));
app.options('*', cors());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', '..', '..', 'dist')));

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
