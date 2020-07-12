import express from 'express';

import { AUTH_LOG_IN, AUTH_SIGN_UP, AUTH_RESET } from 'shared/constants/api';
import { RESET_PASSWORD } from 'serverSrc/constants/mails';
import { sendEmails } from 'serverSrc/helpers/mailer';

import { validateLoginData, validateResetData, validateSignupData } from './validation';
import { logInUser } from "serverSrc/database/models/users";

const handleAction = async (
  data: object,
  validationFunc: (data: object) => boolean,
  handlerFunc: (data: any) => any,
  res: any
) => {
  if (validationFunc(data)) {
    const response = await handlerFunc(data);
    res.status(200).send(response);
    return;
  }
  res.status(404).send('Invalid data!');
};

const getResetPassFunc = (body: any) => async () => {
  const emailSent = await sendEmails(RESET_PASSWORD, {
    resetLink: 'resetLink',
  }, [body.email.value]);

  return {
    errors: emailSent ? [] : ['An error occurred while send the link, please try again later.'],
    successes: emailSent ? ['A reset link has been sent to your email address'] : [],
  }
};

const getLogInFunc = (req: any, res: any, { email, password }: any) => async () => {
  const loggedIn = await logInUser(email.value, password.value);
  if (loggedIn) {
    // This way we either log in new user or log out logged user.
    // FE shouldn't let logged user access the login page until explicit logout action, thus the condition should never be met
    if (req.session.user && req.session.user !== email.value && req.cookies.user_sid) {
      res.clearCookie('user_sid');
    } else {
      req.session.user = email.value;
    }
  }

  return {
    errors: loggedIn ? [] : ['An error occurred during logging in, please try again later.'],
  }
};

export default () => {
  const router = express.Router();
  router.post('/:action', (req, res) => {
    const { params: { action }, body } = req;
    switch (action) {
      case AUTH_LOG_IN:
        handleAction(body, validateLoginData, getLogInFunc(req, res, body), res);
        return;
      case AUTH_SIGN_UP:
        handleAction(body, validateSignupData, () => {}, res);
        return;
      case AUTH_RESET:
        handleAction(body, validateResetData, getResetPassFunc(body), res);
        return;
      default: res.status(404).send('Not Found');
    }
  });

  return router;
};
