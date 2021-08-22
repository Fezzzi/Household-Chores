import { Response } from 'express'

import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR, SUCCESS } from 'shared/constants/localeMessages'
import { MAILS } from 'serverSrc/constants'
import { sendEmails } from 'serverSrc/helpers/mailer'
import { getUser, isCorrectPassword, signUpUser, updateLoginTime } from 'serverSrc/database'
import { setSession } from 'serverSrc/helpers/auth'
import { getProvidersUserId, getUserByProviderId, logInAssignProviderIds } from 'serverSrc/actions/auth/providers'

export const handleResetPass = async ({ email }: any, locale: string, req: any, res: Response) => {
  const emailSent = await sendEmails(MAILS.RESET_PASSWORD, locale, {
    resetLink: ' >>resetLink<< ',
  }, [email])

  if (emailSent) {
    res.status(200).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.RESET_LINK] })
    return true
  }

  res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.RESET_PASS_ERROR] })
  return false
}

export const handleLogIn = async ({ email, password }: any, req: any, res: Response): Promise<boolean> => {
  const user = await getUser(email)

  if (!user) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.NO_ACCOUNT] })
    return false
  }

  const { userId, nickname, fsKey, locale } = user
  const correctPassword = await isCorrectPassword(password, userId)

  if (!correctPassword) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INCORRECT_PASS] })
    return false
  }

  updateLoginTime(userId)
  setSession(req, res, userId, nickname, fsKey, locale)
  res.status(204).send()
  return true
}

export const handleSignUp = async (inputs: any, req: any, res: Response): Promise<boolean> => {
  const { email, nickname, password, photo, googleToken, facebook } = inputs

  let googleId = null
  let facebookId = null
  // First, we try loggin to existing account with matching googleId / facebookId
  if (googleToken || facebook) {
    const providerIds = await getProvidersUserId(googleToken, facebook)
    googleId = providerIds.googleId
    facebookId = providerIds.facebookId

    if (googleId === null && googleToken !== null) {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_GOOGLE_DATA] })
      return false
    }

    if (facebookId === null && facebook !== null) {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_FACEBOOK_DATA] })
      return false
    }

    const user = await getUserByProviderId(req, res, googleId, facebookId, googleToken, facebook)
    if (user !== null) {
      updateLoginTime(user.userId)
      setSession(req, res, user.userId, user.nickname, user.fsKey, user.locale)

      res.status(204).send()
      return true
    }
  }

  const user = await getUser(email)
  // Then we try logging up with email + provider ids / matching password
  if (user !== null) {
    if (googleId || facebookId) {
      // In case user with such email exists but does not yet have assigned any provider id, we assign them and perform log in
      const loggedIn = await logInAssignProviderIds(req, res, user.userId, user.nickname, user.fsKey, user.locale, googleId, facebookId)

      if (!loggedIn) {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.SMTH_BROKE_LOGIN] })
        return false
      }

      res.status(204).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.ACCOUNT_CREATED] })
      return true
    }
    // In case there are no providers' data available but the user exists, we continue as with standrd log in attempt
    return handleLogIn(inputs, req, res)
  }

  // In case the user is truly signing up, create new account and possibly assign available provider ids
  const signUpResult = await signUpUser(
    email,
    nickname,
    password ?? null,
    photo ?? null,
    googleId,
    facebookId,
  )

  if (signUpResult === null || !signUpResult.insertId) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.SIGN_UP_ERROR] })
    return false
  }

  setSession(req, res, signUpResult.insertId, signUpResult.nickname, signUpResult.fsKey, signUpResult.locale)
  res.status(200).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.ACCOUNT_CREATED] })
  return true
}
