import { addActivityForUsers, getNotificationDataForUsers } from 'serverSrc/database'
import { NOTIFICATION_EMAILS, NOTIFICATIONS } from 'serverSrc/constants'

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

  const notificationData = await getNotificationDataForUsers(userIds)
  const notificationEmail = NOTIFICATION_EMAILS[notification]
  const userIdsToEmail = notificationData
    ?.filter(data => data.emailNotifications && data[notification])
    .map(data => data.userId)

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
