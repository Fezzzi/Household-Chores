import { DEFAULT_LOCALE, LOCALE_CODE } from 'shared/constants'
import { applicationTexts } from 'shared/locales'
import { interpolate } from 'shared/helpers/text'
import { addActivityForUsers, getNotificationDataForUsers } from 'api/database'
import { NotifySettingsApiType } from 'api/database/mappers'
import { sendEmails } from 'api/helpers/mailer'
import { EMAIL_TEMPLATE } from 'api/constants'

/**
 * This is entrypoint function that does activity processing.
 * It creates activity feed nodes and optionally sends notifications if the user has then enabled.
 */
export const logActivity = async (
  notification: keyof NotifySettingsApiType,
  locale: LOCALE_CODE,
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
      message: localizedMessage ?? '',
      link,
    }

    sendEmails(usersToEmail, EMAIL_TEMPLATE.ACTIVITY, activityData, locale)
  }
}
