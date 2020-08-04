import express from 'express';
import path from 'path';

import { AUTH_PREFIX, LOAD_PREFIX } from 'shared/constants/api';

import LoadRouter from './load';
import AuthRouter from './auth';

// Middleware function to check for logged-in users
/* Uncomment when there's something that will use it and add { NextFunction } to express imports
const sessionChecker = (req: any, res: any, next: NextFunction) => {
  if (req.session && req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.status(403).send('Access denied!');
  }
};
*/

export default () => {
  const router = express.Router();

  router.all(/.*/, (req, res, next) => {
    if (req.xhr) {
      next();
    } else {
      res
        .status(200)
        .sendFile(path.resolve(__dirname, '..', '..', '..', '..', 'dist', 'index.html'));
    }
  });

  router.use(`/${LOAD_PREFIX}`, LoadRouter());
  router.use(`/${AUTH_PREFIX}`, AuthRouter());

  router.all(/.*/, (_req, res) => {
    res.status(404).send('Not Found');
  });

  return router;
};
