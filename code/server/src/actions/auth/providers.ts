import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import base64url from 'base64url';
import dotenv from 'dotenv';

import { ERROR } from 'shared/constants/localeMessages';
import { findFacebookUser, findGoogleUser, assignUserProvider, updateLoginTime } from 'serverSrc/database/models/users';
import { setUserCookie } from 'serverSrc/helpers/auth';

const config = dotenv.config();

const CLIENT_ID = (config.parsed && config.parsed.GCID) || '';
const client = new OAuth2Client(CLIENT_ID);
const getGoogleUserId = async (googleToken: string): Promise<number|string> => client.verifyIdToken({
  idToken: googleToken,
  audience: CLIENT_ID,
}).then((ticket => {
  const payload = ticket.getPayload();
  return (payload && payload.aud === CLIENT_ID && payload.sub) || -1;
})).catch(() => -1);

const APP_SECRET = (config.parsed && config.parsed.FB_APP_SECRET) || '';
const getFacebookUserId = ({ userID, signedRequest }: any): number|string => {
  const [encodedSignature, encodedPayload] = signedRequest.split('.');
  const signature = base64url.decode(encodedSignature);
  const hmac = crypto.createHmac('sha256', APP_SECRET);
  const expectedSignature = hmac.update(encodedPayload).digest();

  if (signature !== expectedSignature.toString()) {
    return -1;
  }

  return userID;
};

export const getProvidersUserId = async (googleToken: string, facebook: any): Promise<any> => ({
  googleId: (googleToken && await getGoogleUserId(googleToken)) || null,
  facebookId: (facebook && facebook.signedRequest && getFacebookUserId(facebook)) || null,
});

const logInWithProvider = async (req: any, res: any, condition: boolean, getID: () => Promise<number>): Promise<boolean> => {
  if (condition) {
    const userId = await getID();
    if (userId !== -1) {
      updateLoginTime(userId);
      setUserCookie(req, res, userId);
      return true;
    }
  }
  return false;
};

export const handleProvidersLogIn = async (
  req: any, res: any,
  googleId: string|-1,
  facebookId: string|-1,
  googleToken: string,
  facebook: any
): Promise<object|false> => {
  if (googleId === -1) {
    return { errors: [ERROR.INVALID_GOOGLE_DATA] };
  }

  if (facebookId === -1) {
    return { errors: [ERROR.INVALID_FACEBOOK_DATA] };
  }

  if (
    await logInWithProvider(req, res, !!googleToken, () => findGoogleUser(googleId))
    || await logInWithProvider(req, res, facebook && facebook.signedRequest, () => findFacebookUser(facebookId))
  ) {
    return {};
  }
  return false;
};

export const logInWithIds = async (req: any, res: any, userId: number, googleId: string, facebookId: string): Promise<boolean> => {
  const success = await assignUserProvider(userId, googleId, facebookId);
  if (!success) {
    return false;
  }
  updateLoginTime(userId);
  setUserCookie(req, res, userId);
  return true;
};
