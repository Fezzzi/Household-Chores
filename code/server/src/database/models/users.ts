import { database } from 'serverSrc/database'
import { encryptPass, checkPass, generatePass, generateFsKey } from 'serverSrc/helpers/passwords'
import { CONNECTION_STATE_TYPE, USER_VISIBILITY_TYPE } from 'shared/constants'
import { PROFILE } from 'shared/constants/settingsDataKeys'

import {
  tUsersName, tUsersCols, tConnectionsName, tConnectionsCols, tNotifySettingsName, tNotifySettingsCols,
} from './tables'

export const isCorrectPassword = async (password: string, userId: number): Promise<boolean> => {
  const result = await database.query(`
    SELECT ${tUsersCols.password}
    FROM ${tUsersName}
    WHERE ${tUsersCols.id}=?
  `, [userId])

  return result && result.length && checkPass(password, result[0][tUsersCols.password])
}
export const findProfileData = async (userId: number): Promise<Record<string, string | number>> => {
  const result = await database.query(`
    SELECT ${tUsersCols.nickname}, ${tUsersCols.email}, ${tUsersCols.photo}, ${tUsersCols.visibility}
    FROM ${tUsersName}
    WHERE ${tUsersCols.id}=${userId}
  `)

  return result[0] && {
    [PROFILE.ID]: userId,
    [PROFILE.NAME]: result[0][tUsersCols.nickname],
    [PROFILE.EMAIL]: result[0][tUsersCols.email],
    [PROFILE.PHOTO]: result[0][tUsersCols.photo],
    [PROFILE.CONNECTION_VISIBILITY]: result[0][tUsersCols.visibility],
  }
}

export const findUser = async (email: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(`
    SELECT ${tUsersCols.id}, ${tUsersCols.fs_key}
    FROM ${tUsersName}
    WHERE ${tUsersCols.email}=?
  `, [email])

  return result && result.length
    ? result[0]
    : null
}

export const findGoogleUser = async (googleId: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(`
    SELECT ${tUsersCols.id}, ${tUsersCols.fs_key}
    FROM ${tUsersName}
    WHERE ${tUsersCols.google_id}=?
  `, [googleId])

  return result && result.length
    ? result[0]
    : null
}

export const findFacebookUser = async (facebookId: string): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(`
    SELECT ${tUsersCols.id}, ${tUsersCols.fs_key}
    FROM ${tUsersName}
    WHERE ${tUsersCols.facebook_id}=?
  `, [facebookId])

  return result && result.length
    ? result[0]
    : null
}

export const logInUser = async (
  email: string,
  password: string
): Promise<{ userId: number; fsKey: string } | null> => {
  const result = await database.query(`
    SELECT ${tUsersCols.password}, ${tUsersCols.id}, ${tUsersCols.fs_key}
    FROM ${tUsersName}
    WHERE ${tUsersCols.email}=?
  `, [email])

  const validPass = result && result.length && await checkPass(password, result[0][tUsersCols.password])
  if (!validPass) {
    return null
  }

  const userId = result[0][tUsersCols.id]
  updateLoginTime(userId)
  return {
    userId,
    fsKey: result[0][tUsersCols.fs_key],
  }
}

export const updateLoginTime = (userId: number) =>
  database.query(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.date_last_active}=NOW()
    WHERE ${tUsersCols.id}=?
  `, [userId])

export const updateUserData = async (
  data: Record<string, string | number>,
  userId: number
): Promise<boolean> => {
  const newPass = data[PROFILE.NEW_PASSWORD] && await encryptPass(data[PROFILE.NEW_PASSWORD] as string)
  return database.query(`
    UPDATE ${tUsersName} SET ${
  [
    data[PROFILE.NAME] && `${tUsersCols.nickname}=?`,
    data[PROFILE.EMAIL] && `${tUsersCols.email}=?`,
    data[PROFILE.PHOTO] && `${tUsersCols.photo}=?`,
    data[PROFILE.NEW_PASSWORD] && `${tUsersCols.password}=?`,
    data[PROFILE.CONNECTION_VISIBILITY] && `${tUsersCols.visibility}=?`,
  ].filter(Boolean).join(',')
} WHERE ${tUsersCols.id}=${userId}
    `, [
    data[PROFILE.NAME], data[PROFILE.EMAIL], data[PROFILE.PHOTO], newPass, data[PROFILE.CONNECTION_VISIBILITY],
  ].filter(Boolean)
  )
}

export const SignUpUser = async (
  email: string,
  nickname: string,
  password: string|null,
  photo: string|null,
  googleId: string,
  facebookId: string,
): Promise<{ insertId: number; fsKey: string } | null> =>
  database.withTransaction(async (): Promise<{ insertId: number; fsKey: string }> => {
    const pass = await encryptPass(password ?? generatePass())
    const result = await database.query(`
    INSERT INTO ${tUsersName} (
      ${tUsersCols.email}, ${tUsersCols.nickname}, ${tUsersCols.password}, ${tUsersCols.photo},
      ${tUsersCols.google_id}, ${tUsersCols.facebook_id}, ${tUsersCols.date_registered}, ${tUsersCols.date_last_active}
    ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `, [email, nickname, pass, photo, googleId, facebookId], false)

    if (result.insertId) {
      const fsKey = generateFsKey(result.insertId)
      await database.query(`
        UPDATE ${tUsersName}
        SET ${tUsersCols.fs_key}='${fsKey}'
        WHERE ${tUsersCols.id}=${result.insertId}
      `)
      await database.query(`
        INSERT INTO ${tNotifySettingsName} (${tNotifySettingsCols.id_user}) VALUES (${result.insertId})
      `)
      return {
        insertId: result.insertId,
        fsKey,
      }
    }
    return result
  })

export const assignUserProvider = async (userId: number, googleId: string, facebookId: string): Promise<boolean> => {
  if (googleId !== null) {
    return !!database.query(`
      UPDATE ${tUsersName}
      SET ${tUsersCols.google_id}=?
      WHERE ${tUsersCols.id}=?
    `, [googleId, userId])
  } else if (facebookId !== null) {
    return !!database.query(`
      UPDATE ${tUsersName}
      SET ${tUsersCols.facebook_id}=?
      WHERE ${tUsersCols.id}=?
    `, [facebookId, userId])
  }
  return false
}

export const queryUsers = async (query: string, userId: number): Promise<Array<object>> =>
  database.query(`
    SELECT users.${tUsersCols.id}, users.${tUsersCols.nickname}, users.${tUsersCols.photo},
      connections.${tConnectionsCols.state}, connections.${tConnectionsCols.message}
    FROM ${tUsersName} AS users
    LEFT JOIN ${tConnectionsName} AS connections
      ON connections.${tConnectionsCols.id_from}=${userId}
        AND connections.${tConnectionsCols.id_to}=users.${tUsersCols.id}
        AND connections.${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.WAITING}'
    WHERE (users.${tUsersCols.nickname} LIKE ? OR users.${tUsersCols.email} LIKE ?)
      AND users.${tUsersCols.id}!=${userId}
      AND NOT EXISTS (
        SELECT * FROM ${tConnectionsName}
        WHERE (${tConnectionsCols.id_from}=${userId} AND ${tConnectionsCols.id_to}=users.${tUsersCols.id}
            AND ${tConnectionsCols.state}!='${CONNECTION_STATE_TYPE.WAITING}')
          OR (${tConnectionsCols.id_from}=users.${tUsersCols.id} AND ${tConnectionsCols.id_to}=${userId})
      )
      AND (${tUsersCols.visibility}='${USER_VISIBILITY_TYPE.ALL}'
        OR EXISTS (
          SELECT * FROM (
            SELECT ${tConnectionsCols.id_from} AS id FROM ${tConnectionsName}
            WHERE ${tConnectionsCols.id_to}=users.${tUsersCols.id}
              AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
            UNION
            SELECT ${tConnectionsCols.id_to} AS id FROM ${tConnectionsName}
            WHERE ${tConnectionsCols.id_from}=users.${tUsersCols.id}
              AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
          ) AS userFriends INNER JOIN (
            SELECT ${tConnectionsCols.id_from} AS id FROM ${tConnectionsName}
            WHERE ${tConnectionsCols.id_to}=${userId}
              AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
            UNION
            SELECT ${tConnectionsCols.id_to} AS id FROM ${tConnectionsName}
            WHERE ${tConnectionsCols.id_from}=${userId}
              AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
          ) AS targetFriends ON userFriends.id=targetFriends.id
        )
      )
  `, [`%${query}%`, `%${query}%`])
