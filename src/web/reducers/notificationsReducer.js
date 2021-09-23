import { createReducer } from '@reduxjs/toolkit'

import { NOTIFICATION_TYPE } from 'shared/constants'

import { NotificationActions } from '../actions'

const initialState = {
  errors: [],
  warnings: [],
  messages: [],
  successes: [],
}

const addNotifications = ({ errors, messages, warnings, successes }, { payload }) => ({
  errors: [...errors, ...(payload[NOTIFICATION_TYPE.ERRORS] || [])],
  messages: [...messages, ...(payload[NOTIFICATION_TYPE.MESSAGES] || [])],
  warnings: [...warnings, ...(payload[NOTIFICATION_TYPE.WARNINGS] || [])],
  successes: [...successes, ...(payload[NOTIFICATION_TYPE.SUCCESSES] || [])],
})

const removeNotification = (state, { payload: { type, id } }) => ({
  ...state,
  [type]: state[type].filter((_notification, index) => index !== id),
})

export default createReducer(initialState, {
  [NotificationActions.addNotifications.toString()]: addNotifications,
  [NotificationActions.removeNotification.toString()]: removeNotification,
})
