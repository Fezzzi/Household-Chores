import { database } from './database'
import { tDialogsName, tDialogsCols } from './tables'
import { mapToUserDialogsApiType, UserDialogsDbType, UserDialogsUnforcedDbType } from './mappers'

export const updateDialogSettings = (data: UserDialogsUnforcedDbType, userId: number) =>
  database.queryBool(`
    UPDATE ${tDialogsName}
    SET ${Object.entries(data).map(([name, value]) => `${name}=${value}`).join(', ')}
    WHERE ${tDialogsCols.user_id}=${userId}
  `)

export const getDialogSettings = async (userId: number) => {
  const result = await database.query<UserDialogsDbType>(`
    SELECT ${Object.values(tDialogsCols).filter(key => key !== tDialogsCols.user_id).join(', ')}
    FROM ${tDialogsName}
    WHERE ${tDialogsCols.user_id}=${userId}
    LIMIT 1
  `)

  return result[0]
    ? mapToUserDialogsApiType(result[0])
    : null
}
