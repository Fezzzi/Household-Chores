import { Response } from 'express'

import { CONNECTION_TABS, NOTIFICATION_TYPE, SETTING_CATEGORIES, API } from 'shared/constants'
import { ACTIVITY, ERROR, SUCCESS } from 'shared/constants/localeMessages'
import { NOTIFICATIONS } from 'serverSrc/constants'
import { createConnectionRequest, getBlockedConnectionIds, getConnections, getUserInfo } from 'serverSrc/database'
import { logActivity } from 'serverSrc/helpers/activity'

export const handleConnectionRequest = async (
  req: any,
  res: Response,
  targetId: number,
  message: string | null,
) => {
  const currentUser = req.session.userId
  const isRequestValid = (await getBlockedConnectionIds(targetId)).every(blockedUser => blockedUser !== currentUser)

  if (isRequestValid) {
    const success = await createConnectionRequest(currentUser, targetId, message ?? null)

    if (success) {
      const { nickname, photo } = await getUserInfo(req.session!.userId)

      logActivity(
        NOTIFICATIONS.CONNECTION_REQUEST,
        [Number(targetId)],
        ACTIVITY.CONNECTION_REQUEST,
        [nickname],
        [photo!],
        `${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.CONNECTIONS}?tab=${CONNECTION_TABS.PENDING}`
      )
      res.status(200).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.CONNECTION_REQUEST_SENT] })
      return true
    } else {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_REQUEST_ERROR] })
      return false
    }
  } else {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
    return false
  }
}

export const handleConnectionAction = async (
  req: any,
  res: Response,
  userId: number,
  action: (currentUser: number, targetUser: number) => Promise<boolean>
) => {
  const success = await action(req.session.userId, userId)
  if (success) {
    const data = await getConnections(req.session.userId)
    if (data) {
      res.status(200).send(data)
      return true
    }
  }
  res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  return false
}
