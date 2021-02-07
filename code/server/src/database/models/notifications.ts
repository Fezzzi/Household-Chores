import { database } from 'serverSrc/database'
import { NOTIFICATIONS } from 'shared/constants/mappingKeys'

import { tNotifySettingsName, tNotifySettingsCols } from './tables'

export const findNotificationSettings = async (userId: number): Promise<Record<string, Record<string, boolean>>> => {
  const result = await database.query(`
    SELECT ${Object.values(tNotifySettingsCols).filter(column => column !== tNotifySettingsCols.id_user).join(', ')}
    FROM ${tNotifySettingsName} WHERE ${tNotifySettingsCols.id_user}=${userId}
  `)
  if (result[0]) {
    return {
      [NOTIFICATIONS.GENERAL]: {
        [tNotifySettingsCols.email_notifications]: result[0][tNotifySettingsCols.email_notifications],
        [tNotifySettingsCols.browser_notifications]: result[0][tNotifySettingsCols.browser_notifications],
        [tNotifySettingsCols.mobile_notifications]: result[0][tNotifySettingsCols.mobile_notifications],
      },
      [NOTIFICATIONS.CONNECTIONS]: {
        [tNotifySettingsCols.connection_approval]: result[0][tNotifySettingsCols.connection_approval],
        [tNotifySettingsCols.connection_request]: result[0][tNotifySettingsCols.connection_request],
      },
      [NOTIFICATIONS.HOUSEHOLDS]: {
        [tNotifySettingsCols.household_deleting]: result[0][tNotifySettingsCols.household_deleting],
        [tNotifySettingsCols.household_expelling]: result[0][tNotifySettingsCols.household_expelling],
        [tNotifySettingsCols.household_invitation]: result[0][tNotifySettingsCols.household_invitation],
        [tNotifySettingsCols.household_joining]: result[0][tNotifySettingsCols.household_joining],
        [tNotifySettingsCols.household_leaving]: result[0][tNotifySettingsCols.household_leaving],
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
