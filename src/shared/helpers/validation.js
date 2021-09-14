import { ERROR } from 'shared/constants/localeMessages'
import { MAX_IMAGE_SIZE, INPUT_TYPE } from 'shared/constants'

const isEmailValid = value => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const reValid = re.test(String(value).toLowerCase())
  return {
    valid: value.length < 128 && reValid,
    message: (value.length >= 128 && ERROR.VALUE_TOO_LONG) || (!reValid && ERROR.INVALID_EMAIL) || '',
  }
}

const isImageValid = (file, maxImageSize = MAX_IMAGE_SIZE) => {
  const re = /^image\/.+$/
  return {
    valid: file
      && re.test(file.type)
      // on FE we don't validate image size as it gets modified in the editor
      && (maxImageSize === -1 || file.size < maxImageSize)
      // on BE we forbid image size validation skipping
      && (!file.data || (maxImageSize !== -1 && file.data.length < maxImageSize * 1.34)),
    message: ERROR.IMAGE_INVALID,
  }
}

export const isInputValid = (type, value, constraints) => {
  switch (type) {
    case INPUT_TYPE.TEXT:
      return {
        valid: value.length > 3 && value.length < 21,
        message: (value.length <= 3 && ERROR.VALUE_TOO_SHORT) || (value.length >= 21 && ERROR.VALUE_TOO_LONG) || '',
      }
    case INPUT_TYPE.PASSWORD:
      return {
        valid: value.length > 7 && value.length < 128,
        message: (value.length <= 7 && ERROR.VALUE_TOO_SHORT) || (value.length >= 128 && ERROR.VALUE_TOO_LONG) || '',
      }
    case INPUT_TYPE.EMAIL:
      return isEmailValid(value)
    case INPUT_TYPE.PHOTO:
      return isImageValid(value, constraints)
    case INPUT_TYPE.TEXT_AREA:
      if (constraints?.max == null) {
        throw new Error('Missing validation constraint for max length')
      }
      return {
        valid: value.length >= (constraints.min ?? 0) && value.length <= constraints.max,
        message: (constraints.min && value.length < constraints.min && ERROR.VALUE_TOO_SHORT)
          || (value.length > constraints.max && ERROR.VALUE_TOO_LONG)
          || '',
      }
    case INPUT_TYPE.SWITCH: {
      return {
        valid: constraints.indexOf(value) !== -1,
        message: ERROR.INVALID_DATA,
      }
    }
    default:
      return { valid: false, message: '' }
  }
}
