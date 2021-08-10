import { apify, SnakeCaseObjectToCamelCase } from 'serverSrc/helpers/api'

import { database } from './database'
import { tNotifySettingsName, tNotifySettingsCols, TNotifySettingsType } from './tables'

export type NotificationSettingsColumn = keyof Omit<TNotifySettingsType, typeof tNotifySettingsCols.user_id>
export const notificationSettingsColumns = Object.values(tNotifySettingsCols)
  .filter(col => col !== tNotifySettingsCols.user_id)

export const findNotificationSettings = async (
  userId: number
): Promise<SnakeCaseObjectToCamelCase<TNotifySettingsType> | null> => {
  const result = await apify(database.query<TNotifySettingsType>(`
    SELECT *
    FROM ${tNotifySettingsName}
    WHERE ${tNotifySettingsCols.user_id}=${userId}
  `))

  return result[0] ?? null
}

export const findNotificationSettingsForUsers = (userIds: number[]) =>
  database.query<TNotifySettingsType>(`
    SELECT *
    FROM ${tNotifySettingsName}
    WHERE ${tNotifySettingsCols.user_id} IN (${userIds.join(',')})
  `)

export const updateNotificationSettings = (data: Record<NotificationSettingsColumn, boolean>, userId: number) =>
  database.queryBool(`
    UPDATE ${tNotifySettingsName}
    SET ${Object.entries(data).map(([key, value]) => `${key}=${value}`).join(', ')}
    WHERE ${tNotifySettingsCols.user_id}=${userId}
  `)
