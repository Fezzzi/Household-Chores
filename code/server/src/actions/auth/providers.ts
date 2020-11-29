import { OAuth2Client } from 'google-auth-library'
import crypto from 'crypto'
import base64url from 'base64url'
import dotenv from 'dotenv'

import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { findFacebookUser, findGoogleUser, assignUserProvider, updateLoginTime } from 'serverSrc/database/models'
import { setSession } from 'serverSrc/helpers/auth'

const config = dotenv.config()

const CLIENT_ID = (config.parsed && config.parsed.GCID) || ''
const client = new OAuth2Client(CLIENT_ID)
const getGoogleUserId = async (googleToken: string): Promise<number|string> => client.verifyIdToken({
  idToken: googleToken,
  audience: CLIENT_ID,
}).then((ticket => {
  const payload = ticket.getPayload()
  return (payload && payload.aud === CLIENT_ID && payload.sub) || -1
})).catch(() => -1)

const APP_SECRET = (config.parsed && config.parsed.FB_APP_SECRET) || ''
const getFacebookUserId = ({ userID, signedRequest }: any): number|string => {
  const [encodedSignature, encodedPayload] = signedRequest.split('.')
  const signature = base64url.decode(encodedSignature)
  const hmac = crypto.createHmac('sha256', APP_SECRET)
  const expectedSignature = hmac.update(encodedPayload).digest()

  if (signature !== expectedSignature.toString()) {
    return -1
  }

  return userID
}

export const getProvidersUserId = async (googleToken: string, facebook: any): Promise<any> => ({
  googleId: (googleToken && await getGoogleUserId(googleToken)) || null,
  facebookId: (facebook && facebook.signedRequest && getFacebookUserId(facebook)) || null,
})

const logInWithProvider = async (
  req: any,
  res: any,
  condition: boolean,
  getID: () => Promise<{ userId: number; fsKey: string } | null>,
): Promise<boolean> => {
  if (condition) {
    const result = await getID()
    if (result !== null) {
      updateLoginTime(result.userId)
      setSession(req, res, result.userId, result.fsKey)
      return true
    }
  }
  return false
}

export const handleProvidersLogIn = async (
  req: any, res: any,
  googleId: string|-1,
  facebookId: string|-1,
  googleToken: string,
  facebook: any,
): Promise<object|false> => {
  if (googleId === -1) {
    return {
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_GOOGLE_DATA],
    }
  }

  if (facebookId === -1) {
    return {
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_FACEBOOK_DATA],
    }
  }

  if (
    await logInWithProvider(req, res, !!googleToken, () => findGoogleUser(googleId))
    || await logInWithProvider(req, res, facebook && facebook.signedRequest, () => findFacebookUser(facebookId))
  ) {
    return {}
  }
  return false
}

export const logInWithIds = async (
  req: any,
  res: any,
  userId: number,
  googleId: string,
  facebookId: string,
  fsKey: string,
): Promise<boolean> => {
  const success = await assignUserProvider(userId, googleId, facebookId)
  if (!success) {
    return false
  }
  updateLoginTime(userId)
  setSession(req, res, userId, fsKey)
  return true
}
