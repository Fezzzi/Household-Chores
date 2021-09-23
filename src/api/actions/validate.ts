import { Response } from 'express'

import { RequestImage } from 'api/actions/types'
import { isInputValid } from 'shared/helpers/validation'
import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

export const validateField = (
  res: Response,
  field: string | number | RequestImage | undefined,
  type: string,
  constraints?: any
): boolean => {
  if (field !== undefined) {
    const validity = isInputValid(type, field, constraints)
    if (!validity.valid) {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [validity.message || ERROR.INVALID_DATA] })
      return false
    }
  }
  return true
}
