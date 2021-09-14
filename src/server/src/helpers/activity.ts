import { DEFAULT_LOCALE } from 'shared/constants'
import applicationTexts from 'shared/locales'
import { interpolate } from 'shared/helpers/text'
import { addActivityForUsers, getNotificationDataForUsers } from 'serverSrc/database'
import { NotifySettingsApiType } from 'serverSrc/database/mappers'
import { sendEmails } from 'serverSrc/helpers/mailer'
import { EMAIL_TEMPLATE } from 'serverSrc/constants'

/**
 * This is entrypoint function that does activity processing.
 * It creates activity feed nodes and optionally sends notifications if the user has then enabled.
 */
export const logActivity = async (
  notification: keyof NotifySettingsApiType,
  locale: string,
  userIds: number[],
  message: string,
  messageTexts: string[],
  messagePhotos: string[],
  link: string | null = null
) => {
  addActivityForUsers(userIds, message, messageTexts, messagePhotos, link)

  const notificationData = await getNotificationDataForUsers(userIds)
  const usersToEmail = notificationData
    ?.filter(data => data.emailNotifications && data[notification])
    .map(data => data.email)

  if (usersToEmail?.length > 0) {
    const localizedMessage = interpolate(applicationTexts[locale ?? DEFAULT_LOCALE], message, messageTexts, true)
    const activityData = {
      photos: messagePhotos,
      message: localizedMessage,
      link,
    }

    sendEmails(usersToEmail, EMAIL_TEMPLATE.ACTIVITY, activityData, locale)
  }
}