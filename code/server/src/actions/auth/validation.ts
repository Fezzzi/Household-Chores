import { isInputValid } from 'shared/helpers/validation'
import { INPUT_TYPE } from 'shared/constants'
import { findUser } from 'serverSrc/database/models/users'

export const validateResetData = async ({ email: { valid, value } }: any): Promise<boolean|number> =>
  valid && isInputValid(INPUT_TYPE.EMAIL, value).valid
  && await findUser(value) !== null

export const validateLoginData = async ({ email, password }: any): Promise<boolean|number> =>
  email.valid && password.valid
  && isInputValid(INPUT_TYPE.EMAIL, email.value).valid
  && isInputValid(INPUT_TYPE.PASSWORD, password.value).valid
  && await findUser(email.value) !== null

export const validateSignupData = async ({ email, nickname, password, googleToken, facebook }: any): Promise<boolean> =>
  email.valid && nickname.valid
  && isInputValid(INPUT_TYPE.EMAIL, email.value).valid
  && isInputValid(INPUT_TYPE.TEXT, nickname.value).valid
  && (
    (password && password.valid && isInputValid(INPUT_TYPE.PASSWORD, password.value).valid)
    || googleToken
    || (facebook.userID && facebook.signedRequest)
  )
