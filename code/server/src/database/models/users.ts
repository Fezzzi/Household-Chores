import { database } from 'serverSrc/database';

import { encryptPass, checkPass, generatePass } from 'serverSrc/helpers/passwords';
import TABLE from './tables/users';

const {
  name: tName,
  columns: {
    id: tabID, email: tabEmail, nickname: tabNickname, password: tabPassword, photo: tabPhoto,
    google_id: tabGoogleID, facebook_id: tabFacebookID,
    date_registered: tabDateRegistered, date_last_active: tabDateLastActive,
  },
} = TABLE;

export const findUser = async (email: string): Promise<number> => {
  const result = await database.query(
    `SELECT ${tabID} FROM ${tName} WHERE ${tabEmail} = '${email}'`
  );

  return result && result.length
    ? result[0][tabID]
    : -1;
};

export const findGoogleUser = async (googleId: string): Promise<number> => {
  const result = await database.query(
    `SELECT ${tabID} FROM ${tName} WHERE ${tabGoogleID} = '${googleId}'`
  );

  return result && result.length
    ? result[0][tabID]
    : -1;
};

export const findFacebookUser = async (facebookId: string): Promise<number> => {
  const result = await database.query(
    `SELECT ${tabID} FROM ${tName} WHERE ${tabFacebookID} = '${facebookId}'`
  );

  return result && result.length
    ? result[0][tabID]
    : -1;
};

export const logInUser = async (email: string, password: string): Promise<number> => {
  const result = await database.query(
    `SELECT ${tabPassword}, ${tabID} FROM ${tName} WHERE ${tabEmail} = '${email}'`
  );

  const validPass = result && result.length && await checkPass(password, result[0][tabPassword]);
  if (!validPass) {
    return -1;
  }

  const userId = result[0][tabID];
  updateLoginTime(userId);
  return userId;
};

export const updateLoginTime = (userId: number) =>
  database.query(`UPDATE ${tName} SET ${tabDateLastActive}=NOW() WHERE ${tabID}=${userId}`);

export const SignUpUser = async (
  email: string,
  nickname: string,
  password: string|null,
  photo: string|null,
  googleId: string,
  facebookId: string,
): Promise<number> => {
  const pass = await encryptPass(password || generatePass());

  return database.query(`
    INSERT INTO ${tName} (
      ${tabEmail}, ${tabNickname}, ${tabPassword}, ${tabPhoto}, ${tabGoogleID}, ${tabFacebookID}, ${tabDateRegistered}, ${tabDateLastActive}
    ) VALUES ('${email}', '${nickname}', '${pass}', ${photo ? `'${photo}'` : photo}, ${googleId}, ${facebookId}, NOW(), NOW())
  `, false);
};

export const assignUserProvider = async (userId: number, googleId: string, facebookId: string): Promise<boolean> => {
  if (googleId !== null) {
    return !!database.query(`UPDATE ${tName} SET ${tabGoogleID}='${googleId}' WHERE ${tabID}=${userId}`);
  } else if (facebookId !== null) {
    return !!database.query(`UPDATE ${tName} SET ${tabFacebookID}='${facebookId}' WHERE ${tabID}=${userId}`);
  }
  return false;
};
