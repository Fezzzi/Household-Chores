import express from 'express';
import path from 'path';

import TestRouter from './test';

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

  router.all(/.*/, (_req, res) => {
    res.status(404).send('Not Found');
  });

  return router;
};
