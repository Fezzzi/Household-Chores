import { Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import crypto from 'crypto'
import base64url from 'base64url'

import {
  getFacebookUser,
  getGoogleUser,
  updateLoginTime,
  assignGoogleProvider,
  assignFacebookProvider,
} from 'serverSrc/database'
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
  facebookId: (facebook?.signedRequest && getFacebookUserId(facebook)) ?? null,
})

export const getUserByProviderId = async (
  req: any,
  res: Response,
  googleId: string | null,
  facebookId: string | null,
  googleToken: string | null,
  facebook: FacebookObject | null,
) => {
  if (googleToken !== null) {
    return getGoogleUser(googleId!)
  }

  if (facebook?.signedRequest) {
    return getFacebookUser(facebookId!)
  }

  return null
}

export const logInAssignProviderIds = async (
  req: any,
  res: Response,
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
