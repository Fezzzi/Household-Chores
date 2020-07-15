import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import base64url from 'base64url';
import dotenv from 'dotenv';

const config = dotenv.config();

const CLIENT_ID = (config.parsed && config.parsed.GCID) || '';
const client = new OAuth2Client(CLIENT_ID);
export const getGoogleUserId = async (googleToken: string): Promise<number|string> => client.verifyIdToken({
  idToken: googleToken,
  audience: CLIENT_ID,
}).then((ticket => {
  const payload = ticket.getPayload();
  return (payload && payload.aud === CLIENT_ID && payload.sub) || -1;
})).catch(() => -1);

const APP_SECRET = (config.parsed && config.parsed.FB_APP_SECRET) || '';
export const getFacebookUserId = ({ userID, signedRequest }: any): number|string => {
  const [encodedSignature, encodedPayload] = signedRequest.split('.');
  const signature = base64url.decode(encodedSignature);
  const hmac = crypto.createHmac('sha256', APP_SECRET);
  const expectedSignature = hmac.update(encodedPayload).digest();

  if (signature !== expectedSignature.toString()) {
    return -1;
  }

  return userID;
};
