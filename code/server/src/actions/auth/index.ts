import express from 'express';

import { AUTH_LOG_IN, AUTH_SIGN_UP, AUTH_RESET } from 'shared/constants/api';
import { sendEmails } from 'serverSrc/helpers/mailer';

import { validateLoginData, validateResetData, validateSignupData } from './validation';
import { getMaxListeners } from 'cluster';

const handleAction = (
  data: object,
  validationFunc: (data: object) => boolean,
  handlerFunc: (data: any) => any,
  res: any
) => {
  if (validationFunc(data)) {
    const response = handlerFunc(data);
    res.status(200).send(response);
    return;
  }
  res.status(404).send('Invalid data!');
}

export default () => {
  const router = express.Router();
  router.post('/:action', (req, res) => {
    const { params: { action }, body } = req;
    console.log(body);
    switch (action) {
      case AUTH_LOG_IN:
        handleAction(body, validateLoginData, () => {}, res);
        return;
      case AUTH_SIGN_UP:
        handleAction(body, validateSignupData, () => {}, res);
        return;
      case AUTH_RESET:
        if (validateResetData(body)) {
          sendEmails('resetPassword', [body.email.value])
        }
        return;
      default: res.status(404).send('Not Found');
    }
  });

  return router;
};
