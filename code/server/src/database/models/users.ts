import { database } from 'serverSrc/database';

import { encryptPass, checkPass } from 'serverSrc/helpers/passwords';
import TABLE from './tables/users';

export const findUser = async (email: string): Promise<number> => {
  const result = await database.query(
    `SELECT ${TABLE.columns.id} FROM ${TABLE.name} WHERE ${TABLE.columns.email} = '${email}'`
  );

  return result && result.length
    ? result[0][TABLE.columns.id]
    : -1;
};

export const findGoogleUser = async (googleId: number|string): Promise<number> => {
  const result = await database.query(
    `SELECT ${TABLE.columns.id} FROM ${TABLE.name} WHERE ${TABLE.columns.google_id} = '${googleId}'`
  );

  return result && result.length
    ? result[0][TABLE.columns.id]
    : -1;
};

export const findFacebookUser = async (facebookId: number|string): Promise<number> => {
  const result = await database.query(
    `SELECT ${TABLE.columns.id} FROM ${TABLE.name} WHERE ${TABLE.columns.facebook_id} = '${facebookId}'`
  );

  return result && result.length
    ? result[0][TABLE.columns.id]
    : -1;
};

export const logInUser = async (email: string, password: string): Promise<number> => {
  const result = await database.query(
    `SELECT ${TABLE.columns.password}, ${TABLE.columns.id} FROM ${TABLE.name} WHERE ${TABLE.columns.email} = '${email}'`
  );

  const validPass = result && result.length && await checkPass(password, result[0][TABLE.columns.password]);
  if (!validPass) {
    return -1;
  }

  const userId = result[0][TABLE.columns.id];
  database.query(`UPDATE ${TABLE.name} SET ${TABLE.columns.date_last_active}=NOW() WHERE ${TABLE.columns.id}=${userId}`);
  return userId;
};

export const SignUpUser = async (
  email: string,
  nickname: string,
  password: string|null,
  photo: string|null,
  googleId: string|number|null,
  facebookId: string|number|null,
): Promise<number> => database.query(
  `INSERT INTO ${TABLE.name}
    (${TABLE.columns.email}, ${TABLE.columns.nickname}, ${TABLE.columns.password}, ${TABLE.columns.photo},
    ${TABLE.columns.google_id}, ${TABLE.columns.facebook_id}, ${TABLE.columns.date_registered}, ${TABLE.columns.date_last_active})
    VALUES ('${email}', '${nickname}', ${password ? `'${await encryptPass(password)}'` : password},
    ${photo ? `'${photo}'` : photo}, ${googleId}, ${facebookId}, NOW(), NOW())`,
  false);
