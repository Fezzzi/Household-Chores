import { createReducer, combineReducers } from '@reduxjs/toolkit';

import * as RootActions from 'clientSrc/actions/rootActions';
import * as AuthActions from 'clientSrc/actions/authActions';

import notificationsReducer from './notificationsReducer';
import themeReducer from './themeReducer';
import localeReducer from './localeReducer';
import settingsReducer from './settingsReducer';
import modalReducer from './modalReducer';

const initialState = {
  debug: true,
  // Set user as logged by default due to routing, otherwise there will be visible redirect each time logged user refreshes the page
  // todo: However, the problem with this is that when server is not responding, FE recognizes user as logged-in - RESOLVE!
  loggedUser: true,
  user: {},
  activityFeed: [],
};

const logInUser = state => ({
  ...state,
  loggedUser: true,
});

const stateLoaded = (state, { payload: { debug, loggedUser, user, activityFeed } }) => ({
  ...state,
  debug,
  loggedUser,
  user,
  activityFeed,
});

const rootReducer = createReducer(initialState, {
  [RootActions.stateLoaded.toString()]: stateLoaded,
  [AuthActions.logInSuccess.toString()]: logInUser,
}
);

export default combineReducers({
  app: rootReducer,
  notifications: notificationsReducer,
  theme: themeReducer,
  locale: localeReducer,
  settings: settingsReducer,
  modal: modalReducer,
});
