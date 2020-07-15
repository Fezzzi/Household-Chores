import { isInputValid } from 'shared/helpers/validation';
import * as InputTypes from 'shared/constants/inputTypes';

import { findUser } from 'serverSrc/database/models/users';

export const validateResetData = async ({ email: { valid, value } }: any): Promise<boolean> =>
  valid && isInputValid(InputTypes.EMAIL, value) && (await findUser(value) !== -1);

export const validateLoginData = async ({ email, password }: any): Promise<boolean> =>
  email.valid && password.valid
  && isInputValid(InputTypes.EMAIL, email.value)
  && isInputValid(InputTypes.PASSWORD, password.value)
  && (await findUser(email.value) !== -1);

export const validateSignupData = async ({ email, nickname, password, googleToken, facebook }: any): Promise<boolean> =>
  email.valid && nickname.valid
  && isInputValid(InputTypes.EMAIL, email.value)
  && isInputValid(InputTypes.TEXT, nickname.value)
  && (
    (password && password.valid && isInputValid(InputTypes.PASSWORD, password.value))
    || googleToken
    || (facebook.userID && facebook.signedRequest)
  );
