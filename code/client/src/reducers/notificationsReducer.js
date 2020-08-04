import { createReducer } from '@reduxjs/toolkit';

import * as NotificationActions from '../actions/notificationActions';

const initialState = {
  errors: [],
  warnings: [],
  messages: [],
  successes: [],
};

const addNotifications = ({ errors, messages, warnings, successes }, { payload }) => ({
  errors: [...errors, ...(payload.errors || [])],
  messages: [...messages, ...(payload.messages || [])],
  warnings: [...warnings, ...(payload.warnings || [])],
  successes: [...successes, ...(payload.successes || [])],
});

const removeNotification = (state, { payload: { key, id } }) => ({
  ...state,
  [key]: state[key].filter((_notification, index) => index !== id),
});

export default createReducer(initialState, {
  [NotificationActions.addNotifications.toString()]: addNotifications,
  [NotificationActions.removeNotification.toString()]: removeNotification,
});
