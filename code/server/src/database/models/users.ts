import { database } from 'serverSrc/database';

import TABLE from './tables/users';

export const userExists = (email: string): number => {
  console.log('user exists', email);
  return 1;
};
