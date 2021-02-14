import { database } from 'serverSrc/database'
import { apifyKey } from 'serverSrc/helpers/api'

import { tNotifySettingsName, tNotifySettingsCols } from './tables'

const groupMappings: Record<string, string[]> = {
  general: [
    tNotifySettingsCols.email_notifications,
    tNotifySettingsCols.browser_notifications,
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
    SELECT ${Object.values(tNotifySettingsCols).filter(column => column !== tNotifySettingsCols.id_user).join(', ')}
    FROM ${tNotifySettingsName} WHERE ${tNotifySettingsCols.id_user}=${userId}
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

export const updateNotificationSettings = (data: Record<string, string | number>, userId: number): Promise<boolean> =>
  database.query(`
    UPDATE ${tNotifySettingsName}
    SET ${Object.entries(data).map(([key, value]) => `${key}=${value ? 1 : 0}`).join(', ')}
    WHERE ${tNotifySettingsCols.id_user}=${userId}
  `)
