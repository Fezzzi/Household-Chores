import { database } from 'serverSrc/database';

import TABLE from './tables/users';

export const findUser = async (email: string): Promise<number> => {
  console.log('user does not exist', email);
  return -1;
};

export const findGoogleUser = async (googleId: number|string): Promise<number> => {
  console.log('google user does not exist', googleId);
  return -1;
};

export const logInUser = async (email: string, password: string): Promise<number> => {
  console.log('log in user', email, password);
  return 1;
};

export const SignUpUser = async ({ email, nickname, password, photo, facebook }: any, googleId: string|number): Promise<number> => {
  console.log('sign up user', email, nickname, password, photo, facebook, googleId);
  return 1;
};
