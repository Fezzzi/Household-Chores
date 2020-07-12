import express, {NextFunction, Request, Response} from 'express';
import path from 'path';

import {AUTH_PREFIX, LOAD_PREFIX} from 'shared/constants/api';

import TestRouter from './test';
import LoadRouter from './load';
import AuthRouter from './auth';

// Middleware function to check for logged-in users
const sessionChecker = (req: Request<any>, res: Response<any>, next: NextFunction) => {
  next(); // todo: remove after login is tested
  /*
  if (req.session && req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.status(403).send('Access denied!');
  }
  */
};

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

  router.all('/test', TestRouter());
  router.use(`/${LOAD_PREFIX}`, LoadRouter());
  router.use(`/${AUTH_PREFIX}`, sessionChecker /* todo: remove after login is tested */, AuthRouter());

  router.all(/.*/, (_req, res) => {
    res.status(404).send('Not Found');
  });

  return router;
};
