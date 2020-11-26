import { database } from 'serverSrc/database';
import { encryptPass, checkPass, generatePass, generateFsKey } from 'serverSrc/helpers/passwords';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';
import { PROFILE } from 'shared/constants/settingsDataKeys';
import USER_VISIBILITY_TYPE from 'shared/constants/userVisibilityType';

import USERS_TABLE from './tables/users';
import CONNECTIONS_TABLE from './tables/connections';
import NOTIFICATION_SETTINGS_TABLE from './tables/notification_settings';

const { name: tName, columns: tUserCols } = USERS_TABLE;
const { name: tConnectionsName, columns: tConnectionCols } = CONNECTIONS_TABLE;

const { columns: notifyCols, name: tNotifyName } = NOTIFICATION_SETTINGS_TABLE;

export const isCorrectPassword = async (password: string, userId: number): Promise<boolean> => {
  const result = await database.query(`
    SELECT ${tUserCols.password}
    FROM ${tName}
    WHERE ${tUserCols.id}=?
  `, [userId]);

  return result && result.length && checkPass(password, result[0][tUserCols.password]);
};
export const findProfileData = async (userId: number): Promise<Record<string, string | number>> => {
  const result = await database.query(`
    SELECT ${tUserCols.nickname}, ${tUserCols.email}, ${tUserCols.photo}, ${tUserCols.visibility}
    FROM ${tName}
    WHERE ${tUserCols.id}=${userId}
  `);

  return result[0] && {
    [PROFILE.ID]: userId,
    [PROFILE.NAME]: result[0][tUserCols.nickname],
    [PROFILE.EMAIL]: result[0][tUserCols.email],
    [PROFILE.PHOTO]: result[0][tUserCols.photo],
    [PROFILE.CONNECTION_VISIBILITY]: result[0][tUserCols.visibility],
  };
};

export const findUser = async (email: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(`
    SELECT ${tUserCols.id}, ${tUserCols.fs_key}
    FROM ${tName}
    WHERE ${tUserCols.email}=?
  `, [email]);

  return result && result.length
    ? result[0]
    : null;
};

export const findGoogleUser = async (googleId: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(`
    SELECT ${tUserCols.id}, ${tUserCols.fs_key}
    FROM ${tName}
    WHERE ${tUserCols.google_id}=?
  `, [googleId]);

  return result && result.length
    ? result[0]
    : null;
};

export const findFacebookUser = async (facebookId: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(`
    SELECT ${tUserCols.id}, ${tUserCols.fs_key}
    FROM ${tName}
    WHERE ${tUserCols.facebook_id}=?
  `, [facebookId]);

  return result && result.length
    ? result[0]
    : null;
};

export const logInUser = async (email: string, password: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(`
    SELECT ${tUserCols.password}, ${tUserCols.id}, ${tUserCols.fs_key}
    FROM ${tName}
    WHERE ${tUserCols.email}=?
  `, [email]);

  const validPass = result && result.length && await checkPass(password, result[0][tUserCols.password]);
  if (!validPass) {
    return null;
  }

  const userId = result[0][tUserCols.id];
  updateLoginTime(userId);
  return {
    userId,
    fsKey: result[0][tUserCols.fs_key],
  };
};

export const updateLoginTime = (userId: number) =>
  database.query(`
    UPDATE ${tName}
    SET ${tUserCols.date_last_active}=NOW()
    WHERE ${tUserCols.id}=?
  `, [userId]);

export const updateUserData = async (
  data: Record<string, string | number>,
  userId: number
): Promise<boolean> => {
  const newPass = data[PROFILE.NEW_PASSWORD] && await encryptPass(data[PROFILE.NEW_PASSWORD] as string);
  return database.query(`
    UPDATE ${tName} SET ${
  [
    data[PROFILE.NAME] && `${tUserCols.nickname}=?`,
    data[PROFILE.EMAIL] && `${tUserCols.email}=?`,
    data[PROFILE.PHOTO] && `${tUserCols.photo}=?`,
    data[PROFILE.NEW_PASSWORD] && `${tUserCols.password}=?`,
    data[PROFILE.CONNECTION_VISIBILITY] && `${tUserCols.visibility}=?`,
  ].filter(Boolean).join(',')
} WHERE ${tUserCols.id}=${userId}
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
): Promise<{ insertId: number; fsKey: string } | null> =>
  database.withTransaction(async (): Promise<{ insertId: number; fsKey: string }> => {
    const pass = await encryptPass(password || generatePass());
    const result = await database.query(`
    INSERT INTO ${tName} (
      ${tUserCols.email}, ${tUserCols.nickname}, ${tUserCols.password}, ${tUserCols.photo},
      ${tUserCols.google_id}, ${tUserCols.facebook_id}, ${tUserCols.date_registered}, ${tUserCols.date_last_active}
    ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `, [email, nickname, pass, photo, googleId, facebookId], false);

    if (result.insertId) {
      const fsKey = generateFsKey(result.insertId);
      await database.query(`UPDATE ${tName} SET ${tUserCols.fs_key}='${fsKey}' WHERE ${tUserCols.id}=${result.insertId}`);
      await database.query(`INSERT INTO ${tNotifyName} (${notifyCols.id_user}) VALUES (${result.insertId})`);
      return {
        insertId: result.insertId,
        fsKey,
      };
    }
    return result;
  });

export const assignUserProvider = async (userId: number, googleId: string, facebookId: string): Promise<boolean> => {
  if (googleId !== null) {
    return !!database.query(`
      UPDATE ${tName}
      SET ${tUserCols.google_id}=?
      WHERE ${tUserCols.id}=?
    `, [googleId, userId]);
  } else if (facebookId !== null) {
    return !!database.query(`
      UPDATE ${tName}
      SET ${tUserCols.facebook_id}=?
      WHERE ${tUserCols.id}=?
    `, [facebookId, userId]);
  }
  return false;
};

export const queryUsers = async (query: string, userId: number): Promise<Array<object>> =>
  database.query(`
    SELECT users.${tUserCols.id}, users.${tUserCols.nickname}, users.${tUserCols.photo},
      connections.${tConnectionCols.state}, connections.${tConnectionCols.message}
    FROM ${tName} AS users
    LEFT JOIN ${tConnectionsName} AS connections
      ON connections.${tConnectionCols.id_from}=${userId} AND connections.${tConnectionCols.id_to}=users.${tUserCols.id}
        AND connections.${tConnectionCols.state}='${CONNECTION_STATE_TYPE.WAITING}'
    WHERE (users.${tUserCols.nickname} LIKE ? OR users.${tUserCols.email} LIKE ?)
      AND users.${tUserCols.id}!=${userId}
      AND NOT EXISTS (
        SELECT * FROM ${tConnectionsName}
        WHERE (${tConnectionCols.id_from}=${userId} AND ${tConnectionCols.id_to}=users.${tUserCols.id}
            AND ${tConnectionCols.state}!='${CONNECTION_STATE_TYPE.WAITING}')
          OR (${tConnectionCols.id_from}=users.${tUserCols.id} AND ${tConnectionCols.id_to}=${userId})
      )
      AND (${tUserCols.visibility}='${USER_VISIBILITY_TYPE.ALL}'
        OR EXISTS (
          SELECT * FROM (
            SELECT ${tConnectionCols.id_from} AS id FROM ${tConnectionsName}
            WHERE ${tConnectionCols.id_to}=users.${tUserCols.id} AND ${tConnectionCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
            UNION
            SELECT ${tConnectionCols.id_to} AS id FROM ${tConnectionsName}
            WHERE ${tConnectionCols.id_from}=users.${tUserCols.id} AND ${tConnectionCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
          ) AS userFriends INNER JOIN (
            SELECT ${tConnectionCols.id_from} AS id FROM ${tConnectionsName}
            WHERE ${tConnectionCols.id_to}=${userId} AND ${tConnectionCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
            UNION
            SELECT ${tConnectionCols.id_to} AS id FROM ${tConnectionsName}
            WHERE ${tConnectionCols.id_from}=${userId} AND ${tConnectionCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
          ) AS targetFriends ON userFriends.id=targetFriends.id
        )
      )
  `, [`%${query}%`, `%${query}%`]);
