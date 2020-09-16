import { createReducer } from '@reduxjs/toolkit';

import * as NotificationTypes from 'shared/constants/notificationTypes';

import * as NotificationActions from '../actions/notificationActions';

const initialState = {
  errors: [],
  warnings: [],
  messages: [],
  successes: [],
};

const addNotifications = ({ errors, messages, warnings, successes }, { payload }) => ({
  errors: [...errors, ...(payload[NotificationTypes.ERRORS] || [])],
  messages: [...messages, ...(payload[NotificationTypes.MESSAGES] || [])],
  warnings: [...warnings, ...(payload[NotificationTypes.WARNINGS] || [])],
  successes: [...successes, ...(payload[NotificationTypes.SUCCESSES] || [])],
});

const removeNotification = (state, { payload: { type, id } }) => ({
  ...state,
  [type]: state[type].filter((_notification, index) => index !== id),
});

export default createReducer(initialState, {
  [NotificationActions.addNotifications.toString()]: addNotifications,
  [NotificationActions.removeNotification.toString()]: removeNotification,
});
