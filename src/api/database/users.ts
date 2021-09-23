import { PoolClient } from 'pg'

import { CONNECTION_STATE_TYPE, DEFAULT_LOCALE, USER_VISIBILITY_TYPE } from 'shared/constants'
import { encryptPass, checkPass, generatePass, generateFsKey } from 'api/helpers/passwords'
import { UserCreationError } from 'api/helpers/errors'

import { database } from './database'
import {
  tUsersName, tUsersCols,
  tConnectionsName, tConnectionsCols,
  tNotifySettingsName, tNotifySettingsCols,
  tDialogsName, tDialogsCols,
  TUsersType,
  TConnectionsType,
} from './tables'
import { fMutualConnectionsName, fMutualConnectionsOut } from './functions'
import {
  mapToUserDataApiType,
  mapToUserProfileApiType,
  mapToUserQueryApiType,
  UserDataDbType,
  UserEditDbType,
  UserProfileDbType,
  UserQueryDbType,
} from './mappers'

export const isCorrectPassword = async (password: string, userId: number) => {
  const result = await database.query<Pick<TUsersType, typeof tUsersCols.password>>(`
    SELECT ${tUsersCols.password}
    FROM ${tUsersName}
    WHERE ${tUsersCols.user_id}=$1
  `, [userId])

  if (!result[0]?.[tUsersCols.password]) {
    return false
  }

  return checkPass(password, result[0][tUsersCols.password])
}

export const getProfileData = async (userId: number) => {
  const result = await database.query<UserProfileDbType>(`
    SELECT ${tUsersCols.user_id}, ${tUsersCols.nickname}, ${tUsersCols.email}, ${tUsersCols.photo},
      ${tUsersCols.visibility}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.user_id}=${userId}
  `)

  return result[0]
    ? mapToUserProfileApiType(result[0])
    : null
}

export const getUser = async (email: string) => {
  const result = await database.query<UserDataDbType>(`
    SELECT ${tUsersCols.user_id}, ${tUsersCols.nickname}, ${tUsersCols.file_system_key}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.email}=$1
  `, [email])

  return result[0]
    ? mapToUserDataApiType(result[0])
    : null
}

export const getGoogleUser = async (googleId: string) => {
  const result = await database.query<UserDataDbType>(`
    SELECT ${tUsersCols.user_id}, ${tUsersCols.nickname}, ${tUsersCols.file_system_key}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.google_id}=$1
  `, [googleId])

  return result[0]
    ? mapToUserDataApiType(result[0])
    : null
}

export const getFacebookUser = async (facebookId: string) => {
  const result = await database.query<UserDataDbType>(`
    SELECT ${tUsersCols.user_id}, ${tUsersCols.nickname}, ${tUsersCols.file_system_key}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.facebook_id}=$1
  `, [facebookId])

  return result[0]
    ? mapToUserDataApiType(result[0])
    : null
}

export const updateLoginTime = (userId: number) =>
  database.queryBool(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.date_last_active}=NOW()
    WHERE ${tUsersCols.user_id}=$1
  `, [userId])

export const updateUserData = async (data: UserEditDbType, userId: number) =>
  database.queryBool(`
    UPDATE ${tUsersName}
    SET ${Object.entries(data)
      .filter(([, value]) => Boolean(value))
      .map(([key], index) => `${key}=$${index + 1}`)
      .join(', ')}
    WHERE ${tUsersCols.user_id}=${userId}
  `, Object.values(data).filter(Boolean))

export const signUpUser = async (
  email: string,
  nickname: string,
  password: string | null,
  photo: string | null,
  googleId: string | null,
  facebookId: string | null,
) =>
  database.withTransaction(async client => {
    const pass = await encryptPass(password ?? generatePass())
    const result = await database.query<{
      [tUsersCols.user_id]: TUsersType[typeof tUsersCols.user_id]
    }>(`
      INSERT INTO ${tUsersName} (
        ${tUsersCols.email}, ${tUsersCols.nickname}, ${tUsersCols.password}, ${tUsersCols.photo}, ${tUsersCols.file_system_key},
        ${tUsersCols.google_id}, ${tUsersCols.facebook_id}, ${tUsersCols.date_registered}, ${tUsersCols.date_last_active}
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING ${tUsersCols.user_id}
    `, [email, nickname, pass, photo, '', googleId, facebookId], client, false)

    const newUserId = result[0]?.[tUsersCols.user_id]
    if (newUserId) {
      const fsKey = generateFsKey(newUserId)
      await database.queryBool(`
        UPDATE ${tUsersName}
        SET ${tUsersCols.file_system_key}='${fsKey}'
        WHERE ${tUsersCols.user_id}=${newUserId}
      `, [], client)

      await database.queryBool(`
        INSERT INTO ${tNotifySettingsName} (${tNotifySettingsCols.user_id}) VALUES (${newUserId})
      `, [], client)

      await database.queryBool(`
        INSERT INTO ${tDialogsName} (${tDialogsCols.user_id}) VALUES (${newUserId})
      `, [], client)

      return {
        insertId: newUserId,
        nickname,
        fsKey,
        locale: DEFAULT_LOCALE,
      }
    }

    throw new UserCreationError('User creation failed.')
  })

export const updateUserLocale = (userId: number, newLocale: string) =>
  database.queryBool(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.locale}=$1
    WHERE ${tUsersCols.user_id}=$2
  `, [newLocale, userId])

export const assignGoogleProvider = (userId: number, googleId: string) =>
  database.queryBool(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.google_id}=$1
    WHERE ${tUsersCols.user_id}=$2
  `, [googleId, userId])

export const assignFacebookProvider = (userId: number, facebookId: string) =>
  database.queryBool(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.facebook_id}=$1
    WHERE ${tUsersCols.user_id}=$2
  `, [facebookId, userId])

export const getUserFriendIds = async (userId: number, client: PoolClient | null = null) => {
  const friends = await database.query<
    Pick<TConnectionsType, typeof tConnectionsCols.from_id | typeof tConnectionsCols.to_id>
  >(`
    SELECT ${tConnectionsCols.from_id}, ${tConnectionsCols.to_id}
    FROM ${tConnectionsName}
    WHERE ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
      AND ${tConnectionsCols.to_id}=${userId} OR ${tConnectionsCols.from_id}=${userId}
  `, [], client)

  return friends.map(friend => friend[tConnectionsCols.from_id] === userId
    ? friend[tConnectionsCols.to_id]
    : friend[tConnectionsCols.from_id]
  )
}

// todo: Would be great if it could be ordered by users' 'connection' distance
export const queryUsers = async (query: string, userId: number) =>
  database.withTransaction(async client => {
    const friendIds = await getUserFriendIds(userId, client)

    const users = await database.query<UserQueryDbType>(`
      SELECT ${tUsersCols.user_id}, ${tUsersCols.nickname}, ${tUsersCols.photo},
        ${tConnectionsCols.state}, ${tConnectionsCols.message}, ${tUsersCols.visibility},
        ${fMutualConnectionsOut.mutual_connections}
      FROM ${tUsersName}
      LEFT JOIN ${tConnectionsName}
        ON (${tConnectionsCols.from_id}=${userId} AND ${tConnectionsCols.to_id}=${tUsersCols.user_id})
        OR (${tConnectionsCols.to_id}=${userId} AND ${tConnectionsCols.from_id}=${tUsersCols.user_id})
      LEFT JOIN ${fMutualConnectionsName}('{${friendIds}}')
        ON ${fMutualConnectionsOut.target_user_id}=${tUsersCols.user_id}
      WHERE LOWER(${tUsersCols.nickname}) LIKE LOWER($1)
        AND (${tConnectionsCols.state} IS NULL
          OR (${tConnectionsCols.from_id}=${userId} AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.WAITING}'))
        AND ${tUsersCols.user_id}!=${userId}
        AND (${tUsersCols.visibility}='${USER_VISIBILITY_TYPE.ALL}'
          OR (${tUsersCols.visibility}='${USER_VISIBILITY_TYPE.FOF}' AND mutual_connections > 0))
      ORDER BY mutual_connections DESC
    `, [`%${query}%`], client)

    return users.map(mapToUserQueryApiType)
  })

export const getUserInfo = async (userId: number) => {
  const info = await database.query<
    Pick<TUsersType, typeof tUsersCols.nickname | typeof tUsersCols.photo>
  >(`
    SELECT ${tUsersCols.nickname}, ${tUsersCols.photo}
    FROM ${tUsersName}
    WHERE ${tUsersCols.user_id}=$1
    LIMIT 1
  `, [userId])

  return info[0] ?? null
}
