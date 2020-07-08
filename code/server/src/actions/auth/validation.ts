import { isInputValid } from "shared/helpers/validation";
import * as InputTypes from "shared/constants/inputTypes";

import { userExists } from 'serverSrc/database/models/users';

export const validateResetData = ({ email: { valid, value } }: any): boolean => 
  !valid || isInputValid(InputTypes.EMAIL, value) || !userExists(value)

export const validateLoginData = (data: object): boolean => {
  console.log(data);
  return false;
}

export const validateSignupData = (data: object): boolean => {
  console.log(data);
  return false;
}
