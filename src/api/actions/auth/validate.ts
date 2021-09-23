import { isExternalImage } from 'api/helpers/files'
import { INPUT_TYPE } from 'shared/constants'
import { getUser } from 'api/database'
import { isInputValid } from 'shared/helpers/validation'

export const validateResetData = async ({ email }: any): Promise<boolean> =>
  isInputValid(INPUT_TYPE.EMAIL, email).valid
  && await getUser(email) !== null

export const validateLoginData = async ({ email, password }: any): Promise<boolean> =>
  isInputValid(INPUT_TYPE.EMAIL, email).valid
  && isInputValid(INPUT_TYPE.PASSWORD, password).valid
  && await getUser(email) !== null

export const validateSignupData = async ({ email, nickname, password, photo, googleToken, facebook }: any): Promise<boolean> =>
  isInputValid(INPUT_TYPE.EMAIL, email).valid
  && isInputValid(INPUT_TYPE.TEXT, nickname).valid
  && (!photo || isExternalImage(photo))
  && ((password && isInputValid(INPUT_TYPE.PASSWORD, password).valid)
    || googleToken
    || (facebook.userId && facebook.signedRequest)
  )
