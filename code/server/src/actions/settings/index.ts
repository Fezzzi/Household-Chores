import express from 'express';
import dotenv from 'dotenv';

import * as SettingTypes from 'shared/constants/settingTypes';

import { handleSettingsDataFetch } from 'serverSrc/actions/settings/handlers';

dotenv.config();

export default () => {
  const router = express.Router();
  router.get(/.*/, (req: { query: { category: string, tab: string }}, res) => {const { query: { category, tab } } = req;
    if (Object.values(SettingTypes.CATEGORIES).find(cat => cat === category) !== null) {
      handleSettingsDataFetch(category, tab, res);
    } else {
      res.status(200).send([]);
    }
  });

  router.post(/.*/, (req, res) => {
    const { body } = req;
    console.log(`HOHO, somebody is trying to update data ${body}`);

    res.status(404).send('Not Found');
  });

  return router;
};
