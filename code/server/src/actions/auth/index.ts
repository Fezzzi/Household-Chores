import express from 'express';

import { AUTH_LOG_IN, AUTH_SIGN_UP, AUTH_RESET } from 'shared/constants/api';
import { RESET_PASSWORD } from 'serverSrc/constants/mails';
import { sendEmails } from 'serverSrc/helpers/mailer';
import { logInUser, SignUpUser, findUser } from 'serverSrc/database/models/users';
import { handleAction, setUserCookie } from 'serverSrc/helpers/auth';

import { validateLoginData, validateResetData, validateSignupData } from './validation';
import { getProvidersUserId, handleProvidersLogIn, logInWithIds } from './providers';


const getResetPassFunc = ({ email: { value: email } }: any) => async () => {
  const emailSent = await sendEmails(RESET_PASSWORD, {
    resetLink: 'resetLink',
  }, [email]);

  return {
    errors: emailSent ? [] : ['An error occurred while send the link, please try again later.'],
    successes: emailSent ? ['A reset link has been sent to your email address'] : [],
  };
};

const getLogInFunc = (req: any, res: any, { email: { value: email }, password: { value: password } }: any) => async () => {
  const loggedUserId = await logInUser(email, password);
  if (loggedUserId === -1) {
    return { errors: ['Incorrect password'] };
  } else if (loggedUserId === 0) {
    return { errors: ['An error occurred during logging in, please try again later.'] };
  }

  setUserCookie(req, res, loggedUserId);
  return {};
};

const getSignUpFunc = (req: any, res: any, body: any) => async () => {
  const { email: { value: email }, nickname: { value: nickname }, password, photo, googleToken, facebook } = body;
  const { googleId, facebookId } = await getProvidersUserId(googleToken, facebook);
  const result = await handleProvidersLogIn(req, res, googleId, facebookId, googleToken, facebook);
  if (result !== false) {
    return result;
  }

  const userId = await findUser(email);
  if (userId !== -1) {
    if (googleId || facebookId) {
      if (await logInWithIds(req, res, userId, googleId, facebookId)) {
        return {};
      } else {
        return { errors: ['Something broke, please try to log in with different method.'] };
      }
    }
    return getLogInFunc(req, res, body)();
  }

  const signedUp = await SignUpUser(
    email, nickname,
    (password && password.value) || null,
    photo || null,
    googleId, facebookId,
  );
  if (signedUp) {
    setUserCookie(req, res, signedUp);
  }
  return {
    errors: signedUp ? [] : ['An error occurred during signing up, please try again later.'],
  };
};

export default () => {
  const router = express.Router();
  router.post('/:action', (req, res) => {
    const { params: { action }, body } = req;
    switch (action) {
      case AUTH_LOG_IN:
        return handleAction(body, validateLoginData, getLogInFunc(req, res, body), res);
      case AUTH_SIGN_UP:
        return handleAction(body, validateSignupData, getSignUpFunc(req, req, body), res);
      case AUTH_RESET:
        return handleAction(body, validateResetData, getResetPassFunc(body), res);
      default:
        res.status(404).send('Not Found');
        return false;
    }
  });

  return router;
};
