import express from 'express'

import { NOTIFICATION_TYPE, API } from 'shared/constants'
import { ERROR, SUCCESS } from 'shared/constants/localeMessages'
import { MAILS } from 'serverSrc/constants'
import { sendEmails } from 'serverSrc/helpers/mailer'
import { logInUser, SignUpUser, findUser } from 'serverSrc/database/models'
import { handleAction, setSession } from 'serverSrc/helpers/auth'

import { validateLoginData, validateResetData, validateSignupData } from './validation'
import { getProvidersUserId, handleProvidersLogIn, logInWithIds } from './providers'

const getResetPassFunc = ({ email: { value: email } }: any) => async () => {
  const emailSent = await sendEmails(MAILS.RESET_PASSWORD, {
    resetLink: 'resetLink',
  }, [email])

  return {
    [NOTIFICATION_TYPE.ERRORS]: emailSent ? [] : [ERROR.RESET_PASS_ERROR],
    [NOTIFICATION_TYPE.SUCCESSES]: emailSent ? [SUCCESS.RESET_LINK] : [],
  }
}

const getLogInFunc = (req: any, res: any, { email: { value: email }, password: { value: password } }: any) => async () => {
  const result = await logInUser(email, password)
  if (result === null) {
    return {
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.INCORRECT_PASS],
    }
  }

  setSession(req, res, result.userId, result.fsKey)
  return {}
}

const getSignUpFunc = (req: any, res: any, body: any) => async () => {
  const { email: { value: email }, nickname: { value: nickname }, password, photo, googleToken, facebook } = body
  const { googleId, facebookId } = await getProvidersUserId(googleToken, facebook)
  const result = await handleProvidersLogIn(req, res, googleId, facebookId, googleToken, facebook)
  if (result !== false) {
    return result
  }

  const user = await findUser(email)
  if (user !== null) {
    if (googleId || facebookId) {
      if (await logInWithIds(req, res, user.userId, googleId, facebookId, user.fsKey)) {
        return {}
      } else {
        return {
          [NOTIFICATION_TYPE.ERRORS]: [ERROR.SMTH_BROKE_LOGIN],
        }
      }
    }
    return getLogInFunc(req, res, body)()
  }

  const signUpResult = await SignUpUser(
    email, nickname,
    (password && password.value) || null,
    photo || null,
    googleId, facebookId,
  )
  if (!signUpResult?.insertId) {
    return { [NOTIFICATION_TYPE.ERRORS]: [ERROR.SIGN_UP_ERROR] }
  }
  setSession(req, res, signUpResult.insertId, signUpResult.fsKey)
  return { [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.ACCOUNT_CREATED] }
}

export default () => {
  const router = express.Router()
  router.post('/:action', (req, res) => {
    const { params: { action }, body } = req
    switch (action) {
      case API.AUTH_LOG_IN:
        return handleAction(body, validateLoginData, getLogInFunc(req, res, body), res)
      case API.AUTH_SIGN_UP:
        return handleAction(body, validateSignupData, getSignUpFunc(req, req, body), res)
      case API.AUTH_RESET:
        return handleAction(body, validateResetData, getResetPassFunc(body), res)
      default:
        res.status(404).send('Not Found')
        return false
    }
  })

  return router
}
