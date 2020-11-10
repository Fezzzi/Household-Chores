import * as InputTypes from 'shared/constants/inputTypes';
import { ERROR } from 'shared/constants/localeMessages';

const isEmailValid = value => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const reValid = re.test(String(value).toLowerCase());
  return {
    valid: value.length < 128 && reValid,
    message: (value.length >= 128 && ERROR.VALUE_TOO_LONG) || (!reValid && ERROR.INVALID_EMAIL) || '',
  };
};

const isImageValid = (file, maxImageSize = 2000000) => {
  const re = /^image\/.+$/;
  return {
    valid: file
      && re.test(file.type)
      && file.size < maxImageSize
      && (!file.data || file.data.length < maxImageSize * 1.4),
    message: ERROR.IMAGE_INVALID,
  };
};

export const isInputValid = (type, value, constraints) => {
  switch (type) {
    case InputTypes.TEXT:
      return {
        valid: value.length > 3 && value.length < 21,
        message: (value.length <= 3 && ERROR.VALUE_TOO_SHORT) || (value.length >= 21 && ERROR.VALUE_TOO_LONG) || '',
      };
    case InputTypes.PASSWORD:
      return {
        valid: value.length > 7 && value.length < 128,
        message: (value.length <= 7 && ERROR.VALUE_TOO_SHORT) || (value.length >= 128 && ERROR.VALUE_TOO_LONG) || '',
      };
    case InputTypes.EMAIL:
      return isEmailValid(value);
    case InputTypes.PHOTO:
      return isImageValid(value, constraints);
    case InputTypes.SWITCH: {
      return {
        valid: constraints.indexOf(value) !== -1,
        message: ERROR.INVALID_DATA
      }
    }
    default:
      return { valid: false, message: '' };
  }
};
