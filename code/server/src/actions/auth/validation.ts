import { isInputValid } from 'shared/helpers/validation';
import * as InputTypes from 'shared/constants/inputTypes';

import { userExists } from 'serverSrc/database/models/users';

export const validateResetData = ({ email: { valid, value } }: any): boolean =>
  !valid || isInputValid(InputTypes.EMAIL, value) || !userExists(value);

export const validateLoginData = ({ email, password }: any): boolean =>
  !email.valid || !password.valid
  || isInputValid(InputTypes.EMAIL, email.value)
  || isInputValid(InputTypes.PASSWORD, password.value)
  || !userExists(email.value);

export const validateSignupData = (data: object): boolean => {
  console.log(data);
  return false;
};
