import express from 'express';

import loginRouter from './login';

export default () => {
  const router = express.Router();

  router.all('/login', loginRouter());

  router.all('(.*)', (_req, res) => {
    res.status(404).send('Not found dude');
  });

  return router;
};
