import { apifyKey } from 'serverSrc/helpers/api'

import { database } from './database'
import { tNotifySettingsName, tNotifySettingsCols, TNotifySettingsType } from './tables'

export type NotificationSettingsColumn = keyof Omit<TNotifySettingsType, typeof tNotifySettingsCols.user_id>

const groupMappings: Record<string, string[]> = {
  general: [
    tNotifySettingsCols.email_notifications,
    tNotifySettingsCols.mobile_notifications,
  ],
  connections: [
    tNotifySettingsCols.connection_approval,
    tNotifySettingsCols.connection_request,
  ],
  households: [
    tNotifySettingsCols.household_deleting,
    tNotifySettingsCols.household_expelling,
    tNotifySettingsCols.household_invitation,
    tNotifySettingsCols.household_joining,
    tNotifySettingsCols.household_leaving,
  ],
}
const groups = Object.keys(groupMappings)

export const findNotificationSettings = async (
  userId: number
): Promise<Record<string, Record<string, boolean>> | null> => {
  const result = await database.query(`
    SELECT * FROM ${tNotifySettingsName} WHERE ${tNotifySettingsCols.user_id}=${userId}
  `)

  if (result[0]) {
    const settings: Record<string, Record<string, boolean>> = {}
    groups.forEach(group => {
      settings[group] = Object.fromEntries(groupMappings[group].map(key => [apifyKey(key), result[0][key]]))
    })

    return settings
  }
  return null
}

export const findNotificationSettingsForUsers = async (userIds: number[]) =>
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
