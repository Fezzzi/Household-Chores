import * as InputTypes from 'shared/constants/inputTypes';
import {ERROR} from 'shared/constants/localeMessages';

const isEmailValid = value => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const reValid = re.test(String(value).toLowerCase());
  return {
    valid: value.length < 128 && reValid,
    message: (value.length >= 128 && ERROR.VALUE_TOO_LONG) || (!reValid && ERROR.INVALID_EMAIL) || '',
  };
};

const isImageValid = (files, maxImageSize = 1000000) => {
  const re = /^image\/.+$/;
  return {
    valid: files[0]
      && re.test(files[0].type)
      && files[0].size < maxImageSize,
    message: ERROR.IMAGE_INVALID,
  };
};

export const isInputValid = (type, value, maxFileSize) => {
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
      return isImageValid(value, maxFileSize);
    default:
      return { valid: false };
  }
};
