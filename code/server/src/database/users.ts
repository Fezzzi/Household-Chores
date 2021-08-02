import { apify } from 'serverSrc/helpers/api'
import { UserCreationError } from 'serverSrc/helpers/errors'
import { encryptPass, checkPass, generatePass, generateFsKey } from 'serverSrc/helpers/passwords'
import { GeneralEditInputs } from 'serverSrc/actions/settings/types'
import { CONNECTION_STATE_TYPE, DEFAULT_LOCALE, NOTIFICATION_TYPE, USER_VISIBILITY_TYPE } from 'shared/constants/index'
import { ERROR } from 'shared/constants/localeMessages'

import { database } from './database'
import {
  tUsersName, tUsersCols, tConnectionsName, tConnectionsCols,
  tNotifySettingsName, tNotifySettingsCols, tDialogsName, tDialogsCols,
} from './tables'

export const isCorrectPassword = async (password: string, userId: number): Promise<boolean> => {
  const result = await database.query(`
    SELECT ${tUsersCols.password}
    FROM ${tUsersName}
    WHERE ${tUsersCols.id}=?
  `, [userId])

  return result?.[0]?.[tUsersCols.password] && checkPass(password, result[0][tUsersCols.password])
}
export const findProfileData = async (userId: number): Promise<Record<string, string | number>> => {
  const result = await apify<string | number>(database.query(`
    SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.email}, ${tUsersCols.photo},
      ${tUsersCols.visibility}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.id}=${userId}
  `))

  return result[0]
}

export const findUser = async (email: string): Promise<{
  userId: number
  nickname: string
  fsKey: string
  locale: string
} | null> => {
  const result = await database.query(`
    SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.fs_key}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.email}=?
  `, [email])

  return result && result.length
    ? result[0]
    : null
}

export const findGoogleUser = async (googleId: string): Promise<{
  userId: number
  nickname: string
  fsKey: string
  locale: string
} | null> => {
  const result = await database.query(`
    SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.fs_key}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.google_id}=?
  `, [googleId])

  return result && result.length
    ? result[0]
    : null
}

export const findFacebookUser = async (facebookId: string): Promise<{
  userId: number
  nickname: string
  fsKey: string
  locale: string
} | null> => {
  const result = await database.query(`
    SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.fs_key}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.facebook_id}=?
  `, [facebookId])

  return result && result.length
    ? result[0]
    : null
}

export const logInUser = async (
  email: string,
  password: string,
  res: any
): Promise<{ userId: number; nickname: string; fsKey: string; locale: string } | null> => {
  const result = await database.query(`
    SELECT ${tUsersCols.password}, ${tUsersCols.nickname}, ${tUsersCols.id}, ${tUsersCols.fs_key}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.email}=?
  `, [email])

  const userExists = result && result.length > 0
  if (!userExists) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.NO_ACCOUNT] })
    return null
  }

  const validPass = await checkPass(password, result[0][tUsersCols.password])
  if (!validPass) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INCORRECT_PASS] })
    return null
  }

  const userId = result[0][tUsersCols.id]
  updateLoginTime(userId)
  return {
    userId,
    nickname: result[0][tUsersCols.nickname],
    fsKey: result[0][tUsersCols.fs_key],
    locale: result[0][tUsersCols.locale],
  }
}

export const updateLoginTime = (userId: number) =>
  database.query(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.date_last_active}=NOW()
    WHERE ${tUsersCols.id}=?
  `, [userId])

export const updateUserData = async (
  data: GeneralEditInputs,
  userId: number
): Promise<boolean> => {
  const newPass = data.newPassword && await encryptPass(data.newPassword as string)
  /* eslint-disable indent */
  return database.query(`
    UPDATE ${tUsersName} SET ${
      [
        data.nickname && `${tUsersCols.nickname}=?`,
        data.email && `${tUsersCols.email}=?`,
        data.photo && `${tUsersCols.photo}=?`,
        data.newPassword && `${tUsersCols.password}=?`,
        data.visibility && `${tUsersCols.visibility}=?`,
      ].filter(Boolean).join(',')
    } WHERE ${tUsersCols.id}=${userId}
  `, [
    data.nickname, data.email, data.photo, newPass, data.visibility,
  ].filter(Boolean))
  /* eslint-enable indent */
}

export const SignUpUser = async (
  email: string,
  nickname: string,
  password: string | null,
  photo: string | null,
  googleId: string | null,
  facebookId: string | null,
): Promise<{ insertId: number; nickname: string; fsKey: string; locale: string } | null> =>
  database.withTransaction(async (): Promise<{
    insertId: number
    nickname: string
    fsKey: string
    locale: string
  }> => {
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
        INSERT INTO ${tNotifySettingsName} (${tNotifySettingsCols.user_id}) VALUES (${result.insertId})
      `)
      await database.query(`
        INSERT INTO ${tDialogsName} (${tDialogsCols.user_id}) VALUES (${result.insertId})
      `)

      return {
        insertId: result.insertId,
        nickname,
        fsKey,
        locale: DEFAULT_LOCALE,
      }
    }

    throw new UserCreationError('User creation failed.')
  })

export const updateUserLocale = async (userId: number, newLocale: string): Promise<boolean> =>
  database.query(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.locale}=?
    WHERE ${tUsersCols.id}=?
  `, [newLocale, userId])

export const assignGoogleProvider = async (userId: number, googleId: string): Promise<boolean> =>
  database.query(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.google_id}=?
    WHERE ${tUsersCols.id}=?
  `, [googleId, userId])

export const assignFacebookProvider = async (userId: number, facebookId: string): Promise<boolean> =>
  database.query(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.facebook_id}=?
    WHERE ${tUsersCols.id}=?
  `, [facebookId, userId])

// todo: Sort secondary by size of matching query
export const queryUsers = async (query: string, userId: number): Promise<Array<object>> =>
  apify(database.query(`
    SELECT users.${tUsersCols.id} as user_id, users.${tUsersCols.nickname}, users.${tUsersCols.photo},
      connections.${tConnectionsCols.state}, connections.${tConnectionsCols.message},
      users.${tUsersCols.visibility} AS visibility,
      (SELECT COUNT(*) FROM (
        SELECT * FROM (
          SELECT ${tConnectionsCols.from_id} AS uf_id FROM ${tConnectionsName}
          WHERE ${tConnectionsCols.to_id}=users.${tUsersCols.id}
            AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
          UNION
          SELECT ${tConnectionsCols.to_id} AS uf_id FROM ${tConnectionsName}
          WHERE ${tConnectionsCols.from_id}=users.${tUsersCols.id}
            AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
        ) AS userFriends INNER JOIN (
          SELECT ${tConnectionsCols.from_id} AS tf_id FROM ${tConnectionsName}
          WHERE ${tConnectionsCols.to_id}=${userId}
            AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
          UNION
          SELECT ${tConnectionsCols.to_id} AS tf_id FROM ${tConnectionsName}
          WHERE ${tConnectionsCols.from_id}=${userId}
            AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
        ) AS targetFriends ON userFriends.uf_id=targetFriends.tf_id
      ) AS mc) AS mutualConnections
    FROM ${tUsersName} AS users
    LEFT JOIN ${tConnectionsName} AS connections
      ON connections.${tConnectionsCols.from_id}=${userId}
        AND connections.${tConnectionsCols.to_id}=users.${tUsersCols.id}
        AND connections.${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.WAITING}'
    WHERE (users.${tUsersCols.nickname} LIKE ? OR users.${tUsersCols.email} LIKE ?)
      AND users.${tUsersCols.id}!=${userId}
      AND NOT EXISTS (
        SELECT * FROM ${tConnectionsName}
        WHERE (${tConnectionsCols.from_id}=${userId} AND ${tConnectionsCols.to_id}=users.${tUsersCols.id}
            AND ${tConnectionsCols.state}!='${CONNECTION_STATE_TYPE.WAITING}')
          OR (${tConnectionsCols.from_id}=users.${tUsersCols.id} AND ${tConnectionsCols.to_id}=${userId})
      )
    HAVING visibility='${USER_VISIBILITY_TYPE.ALL}' OR (visibility='${USER_VISIBILITY_TYPE.FOF}' AND mutualConnections > 0)
    ORDER BY mutualConnections DESC
  `, [`%${query}%`, `%${query}%`]))
