import { createReducer, combineReducers } from '@reduxjs/toolkit';

import * as RootActions from '../actions/rootActions';
import * as AuthActions from '../actions/authActions';
import testReducer from './testReducer';

const initialState = {
  debug: true,
  // Set user as logged by default due to routing, otherwise there will be visible redirect each time logged user refreshes the page
  loggedUser: true,
  notifications: {
    errors: [],
    warnings: [],
    messages: [],
    successes: [],
  },
};

const addNotifications = ({ notifications: { errors, messages, warnings, successes }, ...state }, { payload }) => ({
  ...state,
  notifications: {
    errors: [...errors, ...(payload.errors || [])],
    messages: [...messages, ...(payload.messages || [])],
    warnings: [...warnings, ...(payload.warnings || [])],
    successes: [...successes, ...(payload.successes || [])],
  },
});

const removeNotification = (state, { payload: { key, id } }) => ({
  ...state,
  notifications: {
    ...state.notifications,
    [key]: state.notifications[key].filter((_notification, index) => index !== id),
  },
});

const logInUser = state => ({
  ...state,
  loggedUser: true,
});

const stateLoaded = (state, { payload: { debug, loggedUser }}) => ({
  ...state,
  debug,
  loggedUser,
});

const rootReducer = createReducer(initialState, {
  [RootActions.stateLoaded.toString()]: stateLoaded,
  [RootActions.addNotifications.toString()]: addNotifications,
  [RootActions.removeNotification.toString()]: removeNotification,
  [AuthActions.logInSuccess.toString()]: logInUser,
});

export default combineReducers({
  app: rootReducer,
  test: testReducer,
});
