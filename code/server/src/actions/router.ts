import express from 'express';
import path from 'path';

import { AUTH_PREFIX } from 'shared/constants/api';

import TestRouter from './test';
import AuthRouter from './auth';

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
  router.use(`/${AUTH_PREFIX}`, AuthRouter());

  router.all(/.*/, (_req, res) => {
    res.status(404).send('Not Found');
  });

  return router;
};
