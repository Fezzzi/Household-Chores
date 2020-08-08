import express from 'express';
import * as fs from 'fs';
import path from 'path';

import { RESOURCE_NOT_FOUND } from 'shared/constants/api';
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from 'shared/constants/locale';

const sendResourceData = (res: any, locale_code: string, resource: string): boolean => {
  const resourceFile = path.join(__dirname, '..', '..', 'resources', locale_code, `${resource}.ts`);
  if (fs.existsSync(resourceFile)) {
    const resourceModule = require(resourceFile);
    res.status(200).send(resourceModule.default);
    return true;
  }
  return false;
};

export default () => {
  const router = express.Router();
  router.get('/:resource', (req, res) => {
    const { params: { resource }, query: { locale } } = req;
    const locale_code =
      (locale && AVAILABLE_LOCALES.includes(locale as string) && locale as string)
      || DEFAULT_LOCALE;

    if (sendResourceData(res, locale_code, resource) || sendResourceData(res, locale_code, RESOURCE_NOT_FOUND)) {
      return;
    }
    res.status(404).send('Not Found');
  });

  return router;
};
