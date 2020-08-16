import express, { NextFunction } from 'express';
import path from 'path';

import { AUTH_PREFIX, LOAD_PREFIX, RESOURCES_PREFIX, SETTINGS_PREFIX } from 'shared/constants/api';

import LoadRouter from './load';
import AuthRouter from './auth';
import ResourceRouter from './resources';
import SettingsRouter from './settings';

// Middleware function to check for logged-in users
const sessionChecker = (req: any, res: any, next: NextFunction) => {
  if (req.session && req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.status(403).send('Access denied!');
  }
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

  router.use(`/${LOAD_PREFIX}`, LoadRouter());
  router.use(`/${AUTH_PREFIX}`, AuthRouter());
  router.use(`/${RESOURCES_PREFIX}`, ResourceRouter());
  router.use(`/${SETTINGS_PREFIX}`, sessionChecker, SettingsRouter());

  router.all(/.*/, (_req, res) => {
    res.status(404).send('Not Found');
  });

  return router;
};
