import express from 'express'

import { NOTIFICATION_TYPE, API } from 'shared/constants'
import { ERROR, SUCCESS } from 'shared/constants/localeMessages'
import { MAILS } from 'serverSrc/constants'
import { sendEmails } from 'serverSrc/helpers/mailer'
import { logInUser, SignUpUser, findUser } from 'serverSrc/database/models'
import { setSession } from 'serverSrc/helpers/auth'

import { validateLoginData, validateResetData, validateSignupData } from './validate'
import { getProvidersUserId, handleProvidersLogIn, logInWithIds } from './providers'

const resetPass = async ({ email }: any, locale: string, req: any, res: any) => {
  const emailSent = await sendEmails(MAILS.RESET_PASSWORD, locale, {
    resetLink: ' >>resetLink<< ',
  }, [email])

  if (emailSent) {
    res.status(200).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.RESET_LINK] })
  } else {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.RESET_PASS_ERROR] })
  }
  return true
}

const logIn = async ({ email, password }: any, req: any, res: any): Promise<boolean> => {
  const result = await logInUser(email, password, res)
  if (result === null) {
    return true
  }

  setSession(req, res, result.userId, result.nickname, result.fsKey, result.locale)
  res.status(204).send()
  return true
}

const signUp = async (inputs: any, req: any, res: any): Promise<boolean> => {
  const { email, nickname, password, photo, googleToken, facebook } = inputs

  let googleId = null
  let facebookId = null
  if (googleToken || facebook) {
    // We validate googleToken or facebook data and try resolve appropriate user ids for these providers
    const providerIds = await getProvidersUserId(googleToken, facebook)
    googleId = providerIds.googleId
    facebookId = providerIds.facebookId

    // We attempt to log in the user with retrieved ids or return error in case of invalid validation
    const loggedIn = await handleProvidersLogIn(req, res, googleId, facebookId, googleToken, facebook)
    if (loggedIn) {
      return true
    }
  }

  // In case the user could not be logged in with google or facebook provider, we proceed to email/password
  const user = await findUser(email)
  if (user !== null) {
    // In case user with such email exists but does not yet have assigned any provider id, we assign them and perform log in
    if (googleId || facebookId) {
      if (await logInWithIds(req, res, user.userId, user.nickname, user.fsKey, user.locale, googleId, facebookId)) {
        res.status(204).send()
      } else {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.SMTH_BROKE_LOGIN] })
      }
      return true
    }
    // In case there are no providers' data available but the user exists, we continue as with standrd log in attempt
    return logIn(inputs, req, res)
  }

  // In case the user is truly signing up, create new account and possibly assign available provider ids
  const signUpResult = await SignUpUser(
    email,
    nickname,
    password ?? null,
    photo ?? null,
    googleId,
    facebookId,
  )
  if (!signUpResult?.insertId) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.SIGN_UP_ERROR] })
    return true
  }
  setSession(req, res, signUpResult.insertId, signUpResult.nickname, signUpResult.fsKey, signUpResult.locale)
  res.status(200).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.ACCOUNT_CREATED] })
  return true
}

export default () => {
  const router = express.Router()
  router.post('/:action', async (req, res) => {
    const { params: { action }, body: { inputs } } = req

    if (action === API.AUTH_SIGN_UP) {
      const valid = validateSignupData(inputs)
      if (!valid) {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
        return
      }

      const handled = await signUp(inputs, req, res)
      if (!handled) {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
      }
      return
    }

    res.status(404).send('Not Found')
  })

  router.put('/:action', async (req, res) => {
    const { params: { action }, body: { inputs, locale } } = req

    switch (action) {
      case API.AUTH_LOG_IN: {
        const valid = validateLoginData(inputs)
        if (!valid) {
          res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
          return
        }

        const handled = await logIn(inputs, req, res)
        if (handled) {
          return
        }
        break
      }
      case API.AUTH_RESET: {
        const valid = validateResetData(inputs)
        if (!valid) {
          res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
          return
        }

        const handled = await resetPass(inputs, req.session?.locale ?? locale, req, res)
        if (handled) {
          return
        }
        break
      }
      default:
        res.status(404).send('Not Found')
        return
    }

    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  })

  router.delete('/:action', async (req, res) => {
    const { params: { action } } = req

    if (action === API.AUTH_DELETE) {
      // todo: Finish within separate issue when logging off is implemented
      // todo: Also implement activity associated with removing user from all households and deleting all his households

      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
      return
    }

    res.status(404).send('Not Found')
  })

  return router
}
