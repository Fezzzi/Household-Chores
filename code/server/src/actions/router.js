import express from 'express';

import loginRouter from './login';

export default () => {
  const router = express.Router();
  router.use('/login', loginRouter());
  router.all('(.*)', (req, res) => {
    res.status(404).send('Not found dude');
  });

  return router;
};
