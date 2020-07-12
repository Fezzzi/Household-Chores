import { database } from 'serverSrc/database';

import TABLE from './tables/users';

export const userExists = (email: string): number => {
  console.log('user exists', email);
  return 1;
};

export const logInUser = async (email: string, password: string) => {
  console.log('log in user', email, password);
  return true;
};
