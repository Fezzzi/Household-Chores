import * as InputTypes from 'shared/constants/inputTypes';

const isEmailValid = value => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return value.length < 128 && re.test(String(value).toLowerCase());
};

export const isInputValid = (type, value) => {
  switch (type) {
    case InputTypes.TEXT:
      return value.length > 3 && value.length < 21;
    case InputTypes.PASSWORD:
      return value.length > 7 && value.length < 129;
    case InputTypes.EMAIL:
      return isEmailValid(value);
    default:
      return false;
  }
};