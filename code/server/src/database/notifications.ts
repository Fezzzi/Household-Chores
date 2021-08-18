import { database } from './database'
import { tNotifySettingsName, tNotifySettingsCols, TNotifySettingsType } from './tables'
import {
  mapToNotifyDataApiType,
  mapToNotifySettingsApiType,
  NotifySettingsDbType,
  NotifySettingsUnforcedDbType,
} from './mappers'

export const findNotificationSettings = async (userId: number) => {
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

export const findNotificationDataForUsers = async (userIds: number[]) => {
  const results = await database.query<TNotifySettingsType>(`
    SELECT *
    FROM ${tNotifySettingsName}
    WHERE ${tNotifySettingsCols.user_id} IN (${userIds.join(',')})
  `)

  return results.map(mapToNotifyDataApiType)
}

export const updateNotificationSettings = (data: NotifySettingsUnforcedDbType, userId: number) =>
  database.queryBool(`
    UPDATE ${tNotifySettingsName}
    SET ${Object.entries(data).map(([key, value]) => `${key}=${value}`).join(', ')}
    WHERE ${tNotifySettingsCols.user_id}=${userId}
  `)
