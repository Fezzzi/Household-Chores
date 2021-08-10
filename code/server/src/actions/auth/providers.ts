import { OAuth2Client } from 'google-auth-library'
import crypto from 'crypto'
import base64url from 'base64url'

import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import {
  findFacebookUser, findGoogleUser, updateLoginTime, assignGoogleProvider, assignFacebookProvider,
} from 'serverSrc/database'
import { UserDataApiType } from 'serverSrc/database/mappers'
import { setSession } from 'serverSrc/helpers/auth'
import { CONFIG } from 'serverSrc/constants'

const client = new OAuth2Client(CONFIG.GOOGLE_CLIENT_ID)
const getGoogleUserId = async (googleToken: string): Promise<string | null> => {
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: CONFIG.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()
  if (!payload || payload.aud !== CONFIG.GOOGLE_CLIENT_ID || !payload.sub) {
    return null
  }

  return payload.sub
}

interface FacebookObject {
  userId: string
  signedRequest: string
}

const getFacebookUserId = ({ userId, signedRequest }: FacebookObject): string | null => {
  const [encodedSignature, encodedPayload] = signedRequest.split('.')
  const signature = base64url.decode(encodedSignature)
  const hmac = crypto.createHmac('sha256', CONFIG.FACEBOOK_SECRET)
  const expectedSignature = hmac.update(encodedPayload).digest()

  if (signature !== expectedSignature.toString()) {
    return null
  }

  return userId
}

interface ProviderIds {
  googleId: string | null
  facebookId: string | null
}

export const getProvidersUserId = async (googleToken: string, facebook: FacebookObject): Promise<ProviderIds> => ({
  googleId: (googleToken && await getGoogleUserId(googleToken)) ?? null,
  facebookId: (facebook && facebook.signedRequest && getFacebookUserId(facebook)) ?? null,
})

const logInWithProvider = async (
  req: any,
  res: any,
  getID: () => Promise<UserDataApiType | null>,
): Promise<boolean> => {
  const result = await getID()
  if (result === null) {
    return false
  }

  updateLoginTime(result.userId)
  setSession(req, res, result.userId, result.nickname, result.fsKey, result.locale)
  return true
}

export const handleProvidersLogIn = async (
  req: any,
  res: any,
  googleId: string | null,
  facebookId: string | null,
  googleToken: string | null,
  facebook: FacebookObject | null,
): Promise<boolean> => {
  if (googleId === null) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_GOOGLE_DATA] })
    return true
  }

  if (facebookId === null) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_FACEBOOK_DATA] })
    return true
  }

  const loggedIn = (googleToken !== null && await logInWithProvider(req, res, () => findGoogleUser(googleId)))
    || (facebook && facebook.signedRequest && await logInWithProvider(req, res, () => findFacebookUser(facebookId)))

  if (loggedIn) {
    res.status(204).send()
    return true
  }

  return false
}

export const logInWithIds = async (
  req: any,
  res: any,
  userId: number,
  userNickname: string,
  fsKey: string,
  locale: string,
  googleId: string | null,
  facebookId: string | null,
): Promise<boolean> => {
  let success = false

  if (googleId !== null) {
    success = await assignGoogleProvider(userId, googleId)
  } else if (facebookId !== null) {
    success = await assignFacebookProvider(userId, facebookId)
  }

  if (!success) {
    return false
  }
  updateLoginTime(userId)
  setSession(req, res, userId, userNickname, fsKey, locale)
  return true
}
