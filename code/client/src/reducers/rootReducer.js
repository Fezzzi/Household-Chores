import { createReducer, combineReducers } from '@reduxjs/toolkit';

import * as RootActions from '../actions/rootActions';
import testReducer from './testReducer';

const initialState = {
  debug: true,
  notifications: {
    errors: [],
    warnings: [],
    messages: [],
    successes: [],
  },
};

const addNotifications = ({ notifications: {errors, messages, warnings, successes }}, { payload }) => ({
  notifications: {
    errors: [...errors, ...(payload.errors || [])],
    messages: [...messages, ...(payload.messages || [])],
    warnings: [...warnings, ...(payload.warnings || [])],
    successes: [...successes, ...(payload.successes || [])],
  },
});

const removeNotification = (state, { payload: { key, id }}) => ({
  notifications: {
    ...state.notifications,
    [key]: state.notifications[key].filter((_notification, index) => index !== id),
  },
})

const rootReducer = createReducer(initialState, {
  [RootActions.addNotifications.toString()]: addNotifications,
  [RootActions.removeNotification.toString()]: removeNotification,
});

export default combineReducers({
  app: rootReducer,
  test: testReducer,
});
