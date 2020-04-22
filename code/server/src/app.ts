import express from 'express';
import morgan from 'morgan';
import path from 'path';

import router from './actions/router';
import logger from './helpers/logger';
import { ACCESS_LOG } from "./constants/logs";

// Initialize the server
const app = express();

// Setup access logging
app.use(morgan(':remote-addr - :remote-user ":method :url" :status :response-time ms', {
  stream: {
    write: (str:string) => logger(ACCESS_LOG, str),
  },
}));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', '..', '..', 'dist')));

// Setup routing
app.use(router());

export default app;
