import express from 'express';
import dotenv from 'dotenv';

import { LOAD_STATE } from 'shared/constants/api';

const config = dotenv.config();

export default () => {
  const router = express.Router();
  router.get('/:action', (req, res) => {
    const { params: { action }, body } = req;
    switch (action) {
      case LOAD_STATE:
        res.status(200).send({
          debug: config.parsed && config.parsed.DEBUG,
          loggedUser: !!(req.session && req.session.user && req.cookies.user_sid),
        });
        return;
      default: res.status(404).send('Not Found');
    }
  });

  return router;
};
