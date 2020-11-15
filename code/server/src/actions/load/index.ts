import express from 'express';
import dotenv from 'dotenv';

import { LOAD_STATE } from 'shared/constants/api';
import {findProfileData} from "serverSrc/database/models/users";

dotenv.config();

export default () => {
  const router = express.Router();
  router.get('/:action', async (req, res) => {
    const { params: { action } } = req;
    switch (action) {
      case LOAD_STATE:
        const userId = req.session && req.cookies.user_sid && req.session.user
        res.status(200).send({
          debug: process.env.DEBUG,
          loggedUser: !!(userId),
          user: await findProfileData(userId),
        });
        return;
      default:
        res.status(404).send('Not Found');
    }
  });

  return router;
};
