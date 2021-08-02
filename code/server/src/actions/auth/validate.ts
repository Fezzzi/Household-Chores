import { isExternalImage } from 'serverSrc/helpers/files'
import { INPUT_TYPE } from 'shared/constants'
import { findUser } from 'serverSrc/database'
import { isInputValid } from 'shared/helpers/validation'

export const validateResetData = async ({ email }: any): Promise<boolean> =>
  isInputValid(INPUT_TYPE.EMAIL, email).valid
  && await findUser(email) !== null

export const validateLoginData = async ({ email, password }: any): Promise<boolean> =>
  isInputValid(INPUT_TYPE.EMAIL, email).valid
  && isInputValid(INPUT_TYPE.PASSWORD, password).valid
  && await findUser(email) !== null

export const validateSignupData = async ({ email, nickname, password, photo, googleToken, facebook }: any): Promise<boolean> =>
  isInputValid(INPUT_TYPE.EMAIL, email).valid
  && isInputValid(INPUT_TYPE.TEXT, nickname).valid
  && (!photo || isExternalImage(photo))
  && ((password && isInputValid(INPUT_TYPE.PASSWORD, password).valid)
    || googleToken
    || (facebook.userId && facebook.signedRequest)
  )
