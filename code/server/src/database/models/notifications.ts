import { database } from 'serverSrc/database'
import { NOTIFICATIONS } from 'shared/constants/settingsDataKeys'

import { tNotifySettingsName, tNotifySettingsCols } from './tables'

export const findNotificationSettings = async (userId: number): Promise<Record<string, any>> => {
  const result = await database.query(`
    SELECT ${Object.values(tNotifySettingsCols).filter(column => column !== tNotifySettingsCols.id_user).join(', ')}
    FROM ${tNotifySettingsName} WHERE ${tNotifySettingsCols.id_user}=${userId}
  `)
  if (result[0]) {
    return {
      [NOTIFICATIONS.GENERAL]: {
        email_notifications: result[0][tNotifySettingsCols.email_notifications],
        browser_notifications: result[0][tNotifySettingsCols.browser_notifications],
        mobile_notifications: result[0][tNotifySettingsCols.mobile_notifications],
      },
      [NOTIFICATIONS.CONNECTIONS]: {
        connection_approval: result[0][tNotifySettingsCols.connection_approval],
        connection_request: result[0][tNotifySettingsCols.connection_request],
      },
      [NOTIFICATIONS.HOUSEHOLDS]: {
        household_deleting: result[0][tNotifySettingsCols.household_deleting],
        household_expelling: result[0][tNotifySettingsCols.household_expelling],
        household_invitation: result[0][tNotifySettingsCols.household_invitation],
        household_joining: result[0][tNotifySettingsCols.household_joining],
        household_leaving: result[0][tNotifySettingsCols.household_leaving],
      },
    }
  }
  return result
}

export const updateNotificationSettings = (
  data: Record<string, string | number>,
  userId: number
): Promise<boolean> =>
  database.query(`
    UPDATE ${tNotifySettingsName}
    SET ${Object.entries(data).map(([key, value]) => `${key}=${value ? 1 : 0}`).join(', ')}
    WHERE ${tNotifySettingsCols.id_user}=${userId}
  `)