import express from 'express';

import TestRouter from './test';

export default () => {
  const router = express.Router();

  router.all('/test', TestRouter());

  router.all(/.*/, (_req, res) => {
    res.status(404).send('Not found');
  });

  return router;
};
