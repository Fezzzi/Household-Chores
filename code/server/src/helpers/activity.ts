import { addActivityForUsers, findNotificationSettingsForUsers } from 'serverSrc/database'
import { NOTIFICATION_EMAILS, NOTIFICATIONS } from 'serverSrc/constants'
import { tNotifySettingsCols } from 'serverSrc/database/tables'

/**
 * This is entrypoint function that does activity processing.
 * It creates activity feed nodes and optionally sends notifications if the user has then enabled.
 */
export const logActivity = async (
  notification: NOTIFICATIONS,
  userIds: Array<number>,
  message: string,
  link: string | null = null
) => {
  addActivityForUsers(userIds, message, link)

  const notificationSettings = await findNotificationSettingsForUsers(userIds)
  const notificationEmail = NOTIFICATION_EMAILS[notification]
  const userIdsToEmail = notificationSettings
    ?.filter(settings => settings[tNotifySettingsCols.email_notifications] && settings[notification])
    .map(settings => settings[tNotifySettingsCols.user_id])

  if (userIdsToEmail && userIdsToEmail.length > 0) {
    batchNotificationEmails(notificationEmail, userIdsToEmail, message, link)
  }
}

const batchNotificationEmails = (
  notificationEmail: string,
  userIds: Array<number>,
  message: string,
  link: string | null = null
) => {
  console.log(notificationEmail, userIds, message, link)
}
