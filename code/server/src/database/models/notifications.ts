import { database } from 'serverSrc/database'
import { NOTIFICATIONS } from 'shared/constants/settingsDataKeys'

import NOTIFICATION_SETTINGS_TABLE from './tables/notification_settings'

const { name: tName, columns } = NOTIFICATION_SETTINGS_TABLE

export const findNotificationSettings = async (userId: number): Promise<Record<string, any>> => {
  const result = await database.query(`
    SELECT ${Object.values(columns).filter(column => column !== columns.id_user).join(', ')}
    FROM ${tName} WHERE ${columns.id_user}=${userId}
  `)
  if (result[0]) {
    return {
      [NOTIFICATIONS.GENERAL]: {
        email_notifications: result[0][columns.email_notifications],
        browser_notifications: result[0][columns.browser_notifications],
        mobile_notifications: result[0][columns.mobile_notifications],
      },
      [NOTIFICATIONS.CONNECTIONS]: {
        connection_approval: result[0][columns.connection_approval],
        connection_request: result[0][columns.connection_request],
      },
      [NOTIFICATIONS.HOUSEHOLDS]: {
        household_deleting: result[0][columns.household_deleting],
        household_expelling: result[0][columns.household_expelling],
        household_invitation: result[0][columns.household_invitation],
        household_joining: result[0][columns.household_joining],
        household_leaving: result[0][columns.household_leaving],
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
    UPDATE ${tName}
    SET ${Object.entries(data).map(([key, value]) => `${key}=${value ? 1 : 0}`).join(', ')}
    WHERE ${columns.id_user}=${userId}
  `)
