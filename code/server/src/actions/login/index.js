import express from 'express';

import database from 'serverSrc/models/database';

export default () => {
  const router = express.Router();
  router.get('/login', (_req, res) => {
    database.query('SHOW SCHEMAS', (error, results) => {
      if (error) {
        console.error('db reading error');
        res.status(500).send('Lul');
        
        return;
      }
      res.status(200).send(results);
    });
  });

  return router;
};
