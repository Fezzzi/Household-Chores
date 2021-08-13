import { UserCreationError } from 'serverSrc/helpers/errors'
import { encryptPass, checkPass, generatePass, generateFsKey } from 'serverSrc/helpers/passwords'
import { CONNECTION_STATE_TYPE, DEFAULT_LOCALE, USER_VISIBILITY_TYPE } from 'shared/constants'

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
    WHERE ${tUsersCols.id}=$1
  `, [userId])

  if (!result[0]?.[tUsersCols.password]) {
    return false
  }

  return checkPass(password, result[0][tUsersCols.password])
}

export const findProfileData = async (userId: number) => {
  const result = await database.query<UserProfileDbType>(`
    SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.email}, ${tUsersCols.photo},
      ${tUsersCols.visibility}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.id}=${userId}
  `)

  return result[0]
    ? mapToUserProfileApiType(result[0])
    : null
}

export const findUser = async (email: string) => {
  const result = await database.query<UserDataDbType>(`
    SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.fs_key}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.email}=$1
  `, [email])

  return result[0]
    ? mapToUserDataApiType(result[0])
    : null
}

export const findGoogleUser = async (googleId: string) => {
  const result = await database.query<UserDataDbType>(`
    SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.fs_key}, ${tUsersCols.locale}
    FROM ${tUsersName}
    WHERE ${tUsersCols.google_id}=$1
  `, [googleId])

  return result[0]
    ? mapToUserDataApiType(result[0])
    : null
}

export const findFacebookUser = async (facebookId: string) => {
  const result = await database.query<UserDataDbType>(`
    SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.fs_key}, ${tUsersCols.locale}
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
    WHERE ${tUsersCols.id}=$1
  `, [userId])

export const updateUserData = async (data: UserEditDbType, userId: number) =>
  database.queryBool(`
    UPDATE ${tUsersName}
    SET ${Object.entries(data)
      .filter(([, value]) => Boolean(value))
      .map(([key], index) => `${key}=$${index + 1}`)
      .join(', ')}
    WHERE ${tUsersCols.id}=${userId}
  `, Object.values(data).filter(Boolean))

export const SignUpUser = async (
  email: string,
  nickname: string,
  password: string | null,
  photo: string | null,
  googleId: string | null,
  facebookId: string | null,
) =>
  database.withTransaction(async (): Promise<{
    insertId: number
    nickname: string
    fsKey: string
    locale: string
  }> => {
    const pass = await encryptPass(password ?? generatePass())
    const result = await database.query<{
      [tUsersCols.id]: TUsersType[typeof tUsersCols.id]
    }>(`
      INSERT INTO ${tUsersName} (
        ${tUsersCols.email}, ${tUsersCols.nickname}, ${tUsersCols.password}, ${tUsersCols.photo}, ${tUsersCols.fs_key},
        ${tUsersCols.google_id}, ${tUsersCols.facebook_id}, ${tUsersCols.date_registered}, ${tUsersCols.date_last_active}
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING ${tUsersCols.id}
    `, [email, nickname, pass, photo, '', googleId, facebookId], false)

    const newUserId = result[0]?.[tUsersCols.id]
    if (newUserId) {
      const fsKey = generateFsKey(newUserId)
      await database.queryBool(`
        UPDATE ${tUsersName}
        SET ${tUsersCols.fs_key}='${fsKey}'
        WHERE ${tUsersCols.id}=${newUserId}
      `)
      await database.queryBool(`
        INSERT INTO ${tNotifySettingsName} (${tNotifySettingsCols.user_id}) VALUES (${newUserId})
      `)
      await database.queryBool(`
        INSERT INTO ${tDialogsName} (${tDialogsCols.user_id}) VALUES (${newUserId})
      `)

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
    WHERE ${tUsersCols.id}=$2
  `, [newLocale, userId])

export const assignGoogleProvider = (userId: number, googleId: string) =>
  database.queryBool(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.google_id}=$1
    WHERE ${tUsersCols.id}=$2
  `, [googleId, userId])

export const assignFacebookProvider = (userId: number, facebookId: string) =>
  database.queryBool(`
    UPDATE ${tUsersName}
    SET ${tUsersCols.facebook_id}=$1
    WHERE ${tUsersCols.id}=$2
  `, [facebookId, userId])

export const getUserFriendIds = async (userId: number) => {
  const friends = await database.query<
    Pick<TConnectionsType, typeof tConnectionsCols.from_id | typeof tConnectionsCols.to_id>
  >(`
    SELECT ${tConnectionsCols.from_id}, ${tConnectionsCols.to_id}
    FROM ${tConnectionsName}
    WHERE ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
      AND ${tConnectionsCols.to_id}=${userId} OR ${tConnectionsCols.from_id}=${userId}
  `)

  return friends.map(friend => friend[tConnectionsCols.from_id] === userId
    ? friend[tConnectionsCols.to_id]
    : friend[tConnectionsCols.from_id]
  )
}

// todo: Would be great if it could be ordered by users' 'connection' distance
export const queryUsers = async (query: string, userId: number) =>
  database.withTransaction(async () => {
    const friendIds = await getUserFriendIds(userId)

    const users = await database.query<UserQueryDbType>(`
      SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.photo},
        ${tConnectionsCols.state}, ${tConnectionsCols.message}, ${tUsersCols.visibility},
        ${fMutualConnectionsOut.mutual_connections}
      FROM ${tUsersName}
      LEFT JOIN ${tConnectionsName}
        ON (${tConnectionsCols.from_id}=${userId} AND ${tConnectionsCols.to_id}=${tUsersCols.id})
        OR (${tConnectionsCols.to_id}=${userId} AND ${tConnectionsCols.from_id}=${tUsersCols.id})
      LEFT JOIN ${fMutualConnectionsName}('{${friendIds}}')
        ON ${fMutualConnectionsOut.target_user_id}=${tUsersCols.id}
      WHERE LOWER(${tUsersCols.nickname}) LIKE LOWER($1)
        AND (${tConnectionsCols.state} IS NULL
          OR (${tConnectionsCols.from_id}=${userId} AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.WAITING}'))
        AND ${tUsersCols.id}!=${userId}
        AND (${tUsersCols.visibility}='${USER_VISIBILITY_TYPE.ALL}'
          OR (${tUsersCols.visibility}='${USER_VISIBILITY_TYPE.FOF}' AND mutual_connections > 0))
      ORDER BY mutual_connections DESC
    `, [`%${query}%`])

    return users.map(mapToUserQueryApiType)
  })
