import * as InputTypes from 'shared/constants/inputTypes';

const isEmailValid = value => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return value.length < 128 && re.test(String(value).toLowerCase());
};

const isImageValid = (files, maxImageSize = 1000000) => {
  const re = /^image\/.+$/;
  return files[0]
    && re.test(files[0].type)
    && files[0].size < maxImageSize;
};

export const isInputValid = (type, value, maxFileSize) => {
  switch (type) {
    case InputTypes.TEXT:
      return value.length > 3 && value.length < 21;
    case InputTypes.PASSWORD:
      return value.length > 7 && value.length < 129;
    case InputTypes.EMAIL:
      return isEmailValid(value);
    case InputTypes.PHOTO:
      return isImageValid(value, maxFileSize);
    default:
      return false;
  }
};
