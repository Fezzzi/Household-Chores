import { createAction } from '@reduxjs/toolkit'

import { NOTIFICATION_TYPE } from 'shared/constants'
import { Notifications } from 'shared/apiTypes'

export type AddNotificationPayload = { [key in keyof Notifications]?: Notifications[key] }

export interface RemoveNotificationPayload {
  type: NOTIFICATION_TYPE
  id: number
}

export const NotificationActions = {
  addNotifications: createAction<AddNotificationPayload>('ADD_NOTIFICATIONS'),
  removeNotification: createAction<RemoveNotificationPayload>('REMOVE_NOTIFICATION'),
}
