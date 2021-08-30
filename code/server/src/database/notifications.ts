import { database } from './database'
import { tNotifySettingsName, tNotifySettingsCols, tUsersName, tUsersCols } from './tables'
import {
  mapToNotifyDataApiType,
  mapToNotifySettingsApiType,
  NotifyDataDbType,
  NotifySettingsDbType,
  NotifySettingsUnforcedDbType,
} from './mappers'

export const getNotificationSettings = async (userId: number) => {
  const result = await database.query<NotifySettingsDbType>(`
    SELECT ${Object.values(tNotifySettingsCols).filter(key => key !== tNotifySettingsCols.user_id).join(', ')}
    FROM ${tNotifySettingsName}
    WHERE ${tNotifySettingsCols.user_id}=${userId}
    LIMIT 1
  `)

  return result[0]
    ? mapToNotifySettingsApiType(result[0])
    : null
}

export const getNotificationDataForUsers = async (userIds: number[]) => {
  const results = await database.query<NotifyDataDbType>(`
    SELECT *
    FROM ${tNotifySettingsName} AS settings
    LEFT JOIN (
      SELECT ${tUsersCols.email}, ${tUsersCols.user_id}
      FROM ${tUsersName}
      WHERE ${tUsersCols.user_id} IN (${userIds.join(',')})
    ) AS users ON settings.${tNotifySettingsCols.user_id}=users.${tUsersCols.user_id}
    WHERE settings.${tNotifySettingsCols.user_id} IN (${userIds.join(',')})
    LIMIT 1
  `)

  return results.map(mapToNotifyDataApiType)
}

export const updateNotificationSettings = (data: NotifySettingsUnforcedDbType, userId: number) =>
  database.queryBool(`
    UPDATE ${tNotifySettingsName}
    SET ${Object.entries(data).map(([key, value]) => `${key}=${value}`).join(', ')}
    WHERE ${tNotifySettingsCols.user_id}=${userId}
  `)
