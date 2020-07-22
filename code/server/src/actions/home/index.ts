import express from 'express';

export default () => {
  const router = express.Router();
  router.get('/', (req, res) => {
    const response = {};
    res.status(200).send(response);
  });

  return router;
};
