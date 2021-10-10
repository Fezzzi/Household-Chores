import { createReducer, PayloadAction } from '@reduxjs/toolkit'

import { NOTIFICATION_TYPE } from 'shared/constants'
import { Notifications } from 'shared/apiTypes'

import { NotificationActions, AddNotificationPayload, RemoveNotificationPayload } from '../actions'

export type NotificationState = Notifications

const initialState: NotificationState = {
  errors: [],
  warnings: [],
  messages: [],
  successes: [],
}

const addNotifications = (
  { errors, messages, warnings, successes }: NotificationState,
  { payload }: PayloadAction<AddNotificationPayload>
) => ({
  errors: errors.concat(payload[NOTIFICATION_TYPE.ERRORS] ?? []),
  messages: messages.concat(payload[NOTIFICATION_TYPE.MESSAGES] ?? []),
  warnings: warnings.concat(payload[NOTIFICATION_TYPE.WARNINGS] ?? []),
  successes: successes.concat(payload[NOTIFICATION_TYPE.SUCCESSES] ?? []),
})

const removeNotification = (
  state: NotificationState,
  { payload: { type, id } }: PayloadAction<RemoveNotificationPayload>
) => ({
  ...state,
  [type]: state[type].filter((_, index) => index !== id),
})

export const notificationsReducer = createReducer(initialState, {
  [NotificationActions.addNotifications.toString()]: addNotifications,
  [NotificationActions.removeNotification.toString()]: removeNotification,
})
