import express from 'express'

import { NOTIFICATION_TYPE, API } from 'shared/constants'
import { ERROR, SUCCESS } from 'shared/constants/localeMessages'
import { MAILS } from 'serverSrc/constants'
import { sendEmails } from 'serverSrc/helpers/mailer'
import { logInUser, SignUpUser, findUser } from 'serverSrc/database/models'
import { setSession } from 'serverSrc/helpers/auth'

import { validateLoginData, validateResetData, validateSignupData } from './validation'
import { getProvidersUserId, handleProvidersLogIn, logInWithIds } from './providers'

const resetPass = async ({ email }: any, req: any, res: any) => {
  const emailSent = await sendEmails(MAILS.RESET_PASSWORD, {
    resetLink: 'resetLink',
  }, [email])

  if (emailSent) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.RESET_PASS_ERROR] })
  } else {
    res.status(200).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.RESET_LINK] })
  }
  return true
}

const logIn = async ({ email, password }: any, req: any, res: any): Promise<boolean> => {
  const result = await logInUser(email, password, res)
  if (result === null) {
    return true
  }

  setSession(req, res, result.userId, result.fsKey)
  res.status(204).send()
  return true
}

const signUp = async (inputs: any, req: any, res: any): Promise<boolean> => {
  const { email, nickname, password, photo, googleToken, facebook } = inputs
  const { googleId, facebookId } = await getProvidersUserId(googleToken, facebook)
  const loggedIn = await handleProvidersLogIn(req, res, googleId, facebookId, googleToken, facebook)
  if (loggedIn) {
    return true
  }

  const user = await findUser(email)
  if (user !== null) {
    if (googleId || facebookId) {
      if (await logInWithIds(req, res, user.userId, googleId, facebookId, user.fsKey)) {
        res.status(204).send()
      } else {
        res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.SMTH_BROKE_LOGIN] })
      }
      return true
    }
    return logIn(inputs, req, res)
  }

  const signUpResult = await SignUpUser(
    email,
    nickname,
    password ?? null,
    photo ?? null,
    googleId,
    facebookId,
  )
  if (!signUpResult?.insertId) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.SIGN_UP_ERROR] })
    return true
  }
  setSession(req, res, signUpResult.insertId, signUpResult.fsKey)
  res.status(200).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.ACCOUNT_CREATED] })
  return true
}

export default () => {
  const router = express.Router()
  router.post('/:action', async (req, res) => {
    const { params: { action }, body: { inputs } } = req
    switch (action) {
      case API.AUTH_LOG_IN: {
        const valid = validateLoginData(inputs)
        if (!valid) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
          return true
        }
        const handled = await logIn(inputs, req, res)
        if (handled) {
          return true
        }
        break
      }
      case API.AUTH_SIGN_UP: {
        const valid = validateSignupData(inputs)
        if (!valid) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
          return true
        }
        const handled = await signUp(inputs, req, res)
        if (handled) {
          return true
        }
        break
      }
      case API.AUTH_RESET: {
        const valid = validateResetData(inputs)
        if (!valid) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
          return true
        }
        const handled = await resetPass(inputs, req, res)
        if (handled) {
          return true
        }
        break
      }
      case API.AUTH_DELETE:
        // todo: Finish within navbar issue when logging off is implemented
        return false
      default:
        res.status(404).send('Not Found')
        return false
    }

    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
    return false
  })

  return router
}
