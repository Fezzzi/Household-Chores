import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = '239994956143-jija8teo4gj7ao5iq3bht5eivu1ib4t8.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
export const getGoogleUserId = async (googleToken: string): Promise<number|string> => client.verifyIdToken({
  idToken: googleToken,
  audience: CLIENT_ID,
}).then((ticket => {
  const payload = ticket.getPayload();
  return (payload && payload.aud === CLIENT_ID && payload.sub) || -1;
})).catch(() => -1);
