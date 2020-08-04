import { isInputValid } from 'shared/helpers/validation';
import * as InputTypes from 'shared/constants/inputTypes';

import { findUser } from 'serverSrc/database/models/users';

export const validateResetData = async ({ email: { valid, value } }: any): Promise<boolean|number> =>
  valid && isInputValid(InputTypes.EMAIL, value)
  && findUser(value);

export const validateLoginData = async ({ email, password }: any): Promise<boolean|number> =>
  email.valid && password.valid
  && isInputValid(InputTypes.EMAIL, email.value)
  && isInputValid(InputTypes.PASSWORD, password.value)
  && findUser(email.value);

export const validateSignupData = async ({ email, nickname, password, googleToken, facebook }: any): Promise<boolean> =>
  email.valid && nickname.valid
  && isInputValid(InputTypes.EMAIL, email.value)
  && isInputValid(InputTypes.TEXT, nickname.value)
  && (
    (password && password.valid && isInputValid(InputTypes.PASSWORD, password.value))
    || googleToken
    || (facebook.userID && facebook.signedRequest)
  );
