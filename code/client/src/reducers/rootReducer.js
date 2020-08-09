import { createReducer, combineReducers } from '@reduxjs/toolkit';

import * as RootActions from 'clientSrc/actions/rootActions';
import * as AuthActions from 'clientSrc/actions/authActions';

import testReducer from './testReducer';
import notificationsReducer from './notificationsReducer';
import themeReducer from './themeReducer';

const initialState = {
  debug: true,
  // Set user as logged by default due to routing, otherwise there will be visible redirect each time logged user refreshes the page
  loggedUser: true,
};

const logInUser = state => ({
  ...state,
  loggedUser: true,
});

const stateLoaded = (state, { payload: { debug, loggedUser } }) => ({
  ...state,
  debug,
  loggedUser,
});

const rootReducer = createReducer(initialState, {
  [RootActions.stateLoaded.toString()]: stateLoaded,
  [AuthActions.logInSuccess.toString()]: logInUser,
});

export default combineReducers({
  app: rootReducer,
  notifications: notificationsReducer,
  theme: themeReducer,
  test: testReducer,
});
