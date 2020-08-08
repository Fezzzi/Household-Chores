import express from 'express';
import dotenv from 'dotenv';

import { LOAD_STATE } from 'shared/constants/api';

dotenv.config();

export default () => {
  const router = express.Router();
  router.get('/:action', (req, res) => {
    const { params: { action } } = req;
    switch (action) {
      case LOAD_STATE:
        res.status(200).send({
          debug: process.env.DEBUG,
          loggedUser: !!(req.session && req.session.user && req.cookies.user_sid),
        });
        return;
      default:
        res.status(404).send('Not Found');
    }
  });

  return router;
};
