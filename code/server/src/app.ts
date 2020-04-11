import express from 'express';
import morgan from 'morgan';
import path from 'path';

import router from './actions/router';

// Initialize the server
const app = express();

// Setup logging
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Setup routing
app.use(router());

export default app;
