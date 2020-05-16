import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import errorHandler from './helpers/errorHandler';
import router from './actions/router';
import { Logger } from './helpers/logger';
import { ACCESS_LOG } from './constants/logs';

// Initialize the server
const app = express();

// Setup access logging
app.use(morgan(':remote-addr - :remote-user ":method :url" :status :response-time ms', {
  stream: {
    write: (str: string) => Logger(ACCESS_LOG, str),
  },
}));

// Setup CORS policy
app.use(cors());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', '..', '..', 'dist')));

// Setup routing
app.use(router());

// Add silent error handler
app.use(errorHandler);

export default app;
