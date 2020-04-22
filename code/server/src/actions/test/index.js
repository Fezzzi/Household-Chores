import express from 'express';

import { database } from 'serverSrc/models/database';

export default () => {
  const router = express.Router();
  router.get('/test', (_req, res) => {
    database.query('SHOW SCHEMAS', (error, results) => {
      if (error) {
        res.status(500).send('Something went left');
        return;
      }
      res.status(200).send(results);
    });
  });

  return router;
};
