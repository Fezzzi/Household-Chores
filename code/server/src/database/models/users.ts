import { database } from 'serverSrc/database';
import { encryptPass, checkPass, generatePass, generateFsKey } from 'serverSrc/helpers/passwords';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';
import { PROFILE } from 'shared/constants/settingsDataKeys';
import USER_VISIBILITY_TYPE from 'shared/constants/userVisibilityType';

import USERS_TABLE from './tables/users';
import CONNECTIONS_TABLE from './tables/connections';

const {
  name: tName,
  columns: {
    id: tabID, email: tabEmail, nickname: tabNickname, password: tabPassword, photo: tabPhoto,
    visibility: tabVisibility, google_id: tabGoogleID, facebook_id: tabFacebookID,
    date_registered: tabDateRegistered, date_last_active: tabDateLastActive, fs_key: tabFSKey,
  },
} = USERS_TABLE;

const {
  name: tConnectionsName,
  columns: {
    id_from: tabConnectionsIDFrom, id_to: tabConnectionsIDTo, state: tabConnectionsState, message: tabConnectionsMessage,
  },
} = CONNECTIONS_TABLE;

export const isCorrectPassword = async (password: string, userId: number): Promise<boolean> => {
  const result = await database.query(
    `SELECT ${tabPassword} FROM ${tName} WHERE ${tabID}=?`, [userId]
  );

  return result && result.length && checkPass(password, result[0][tabPassword]);
};
export const findProfileData = async (userId: number): Promise<Record<string, string | number>> => {
  const result = await database.query(`
    SELECT ${tabNickname}, ${tabEmail}, ${tabPhoto}, ${tabVisibility} FROM ${tName} WHERE ${tabID}=${userId}
  `);

  return result[0] && {
    [PROFILE.ID]: userId,
    [PROFILE.NAME]: result[0][tabNickname],
    [PROFILE.EMAIL]: result[0][tabEmail],
    [PROFILE.PHOTO]: result[0][tabPhoto],
    [PROFILE.CONNECTION_VISIBILITY]: result[0][tabVisibility],
  };
};

export const findUser = async (email: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(
    `SELECT ${tabID}, ${tabFSKey} FROM ${tName} WHERE ${tabEmail}=?`, [email]
  );

  return result && result.length
    ? result[0]
    : null;
};

export const findGoogleUser = async (googleId: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(
    `SELECT ${tabID}, ${tabFSKey} FROM ${tName} WHERE ${tabGoogleID}=?`, [googleId]
  );

  return result && result.length
    ? result[0]
    : null;
};

export const findFacebookUser = async (facebookId: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(
    `SELECT ${tabID}, ${tabFSKey} FROM ${tName} WHERE ${tabFacebookID}=?`, [facebookId]
  );

  return result && result.length
    ? result[0]
    : null;
};

export const logInUser = async (email: string, password: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(
    `SELECT ${tabPassword}, ${tabID}, ${tabFSKey} FROM ${tName} WHERE ${tabEmail}=?`, [email]
  );

  const validPass = result && result.length && await checkPass(password, result[0][tabPassword]);
  if (!validPass) {
    return null;
  }

  const userId = result[0][tabID];
  updateLoginTime(userId);
  return {
    userId,
    fsKey: result[0][tabFSKey],
  };
};

export const updateLoginTime = (userId: number) =>
  database.query(`UPDATE ${tName} SET ${tabDateLastActive}=NOW() WHERE ${tabID}=?`, [userId]);

export const updateUserData = async (
  data: Record<string, string | number>,
  userId: number
): Promise<boolean> => {
  const newPass = data[PROFILE.NEW_PASSWORD] && await encryptPass(data[PROFILE.NEW_PASSWORD] as string);
  return database.query(
    `UPDATE ${tName} SET ${
      [
        data[PROFILE.NAME] && `${tabNickname}=?`,
        data[PROFILE.EMAIL] && `${tabEmail}=?`,
        data[PROFILE.PHOTO] && `${tabPhoto}=?`,
        data[PROFILE.NEW_PASSWORD] && `${tabPassword}=?`,
        data[PROFILE.CONNECTION_VISIBILITY] && `${tabVisibility}=?`,
      ].filter(Boolean).join(',')
    } WHERE ${tabID}=${userId}
    `, [
      data[PROFILE.NAME], data[PROFILE.EMAIL], data[PROFILE.PHOTO], newPass, data[PROFILE.CONNECTION_VISIBILITY],
    ].filter(Boolean)
  );
};

export const SignUpUser = async (
  email: string,
  nickname: string,
  password: string|null,
  photo: string|null,
  googleId: string,
  facebookId: string,
): Promise<{ insertId: number; fsKey: string }> => {
  const pass = await encryptPass(password || generatePass());
  const result = await database.query(`
    INSERT INTO ${tName} (
      ${tabEmail}, ${tabNickname}, ${tabPassword}, ${tabPhoto}, ${tabGoogleID}, ${tabFacebookID}, ${tabDateRegistered}, ${tabDateLastActive}
    ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `, [email, nickname, pass, photo, googleId, facebookId], false);

  if (result.insertId) {
    const fsKey = generateFsKey(result.insertId);
    await database.query(`UPDATE ${tName} SET ${tabFSKey}='${fsKey}' WHERE ${tabID}=${result.insertId}`);
    return {
      insertId: result.insertId,
      fsKey,
    };
  }
  return result;
};

export const assignUserProvider = async (userId: number, googleId: string, facebookId: string): Promise<boolean> => {
  if (googleId !== null) {
    return !!database.query(`UPDATE ${tName} SET ${tabGoogleID}=? WHERE ${tabID}=?`, [googleId, userId]);
  } else if (facebookId !== null) {
    return !!database.query(`UPDATE ${tName} SET ${tabFacebookID}=? WHERE ${tabID}=?`, [facebookId, userId]);
  }
  return false;
};

export const queryUsers = async (query: string, userId: number): Promise<Array<object>> =>
  database.query(`
    SELECT users.${tabID}, users.${tabNickname}, users.${tabPhoto}, connections.${tabConnectionsState}, connections.${tabConnectionsMessage}
    FROM ${tName} AS users
    LEFT JOIN ${tConnectionsName} AS connections
      ON connections.${tabConnectionsIDFrom}=${userId} AND connections.${tabConnectionsIDTo}=users.${tabID}
        AND connections.${tabConnectionsState}='${CONNECTION_STATE_TYPE.WAITING}'
    WHERE (users.${tabNickname} LIKE '%${query}%' OR users.${tabEmail} LIKE '%${query}%')
      AND users.${tabID}!=${userId}
      AND NOT EXISTS (
        SELECT * FROM ${tConnectionsName}
        WHERE (${tabConnectionsIDFrom}=${userId} AND ${tabConnectionsIDTo}=users.${tabID}
            AND ${tabConnectionsState}!='${CONNECTION_STATE_TYPE.WAITING}')
          OR (${tabConnectionsIDFrom}=users.${tabID} AND ${tabConnectionsIDTo}=${userId})
      )
      AND (${tabVisibility}='${USER_VISIBILITY_TYPE.ALL}'
        OR EXISTS (
          SELECT * FROM (
            SELECT ${tabConnectionsIDFrom} AS id FROM ${tConnectionsName}
            WHERE ${tabConnectionsIDTo}=users.${tabID} AND ${tabConnectionsState}='${CONNECTION_STATE_TYPE.APPROVED}'
            UNION
            SELECT ${tabConnectionsIDTo} AS id FROM ${tConnectionsName}
            WHERE ${tabConnectionsIDFrom}=users.${tabID} AND ${tabConnectionsState}='${CONNECTION_STATE_TYPE.APPROVED}'
          ) AS userFriends INNER JOIN (
            SELECT ${tabConnectionsIDFrom} AS id FROM ${tConnectionsName}
            WHERE ${tabConnectionsIDTo}=${userId} AND ${tabConnectionsState}='${CONNECTION_STATE_TYPE.APPROVED}'
            UNION
            SELECT ${tabConnectionsIDTo} AS id FROM ${tConnectionsName}
            WHERE ${tabConnectionsIDFrom}=${userId} AND ${tabConnectionsState}='${CONNECTION_STATE_TYPE.APPROVED}'
          ) AS targetFriends ON userFriends.id=targetFriends.id
        )
      )
  `);
