import express from 'express';
import path from 'path';

import database from 'serverSrc/models/database';

export default () => {
  const router = express.Router();
  router.get('/login', (req, res) => {
    database.query('SHOW SCHEMAS', (error, results) => {
      if (error) {
        console.log('db reading error');
        res.status(500).send('Lul');
      }

      const data = { data: results };
      console.log(data);

      res.status(200).sendFile(path.resolve(__dirname, '../../../..', 'dist', 'index.html'));
    });
  });

  return router;
};
