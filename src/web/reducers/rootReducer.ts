import { History } from 'history'
import { createReducer, combineReducers, Reducer, CombinedState } from '@reduxjs/toolkit'
import { connectRouter, RouterState } from 'connected-react-router'

import { Activity } from 'shared/apiTypes'

import { RootActions, AuthActions } from '../actions'
import { notificationsReducer, NotificationState } from './notificationsReducer'
import { themeReducer, ThemeState } from './themeReducer'
import { localeReducer, LocaleState } from './localeReducer'
import settingsReducer from './settingsReducer'
import modalReducer from './modalReducer'
import dialogsReducer from './dialogsReducer'
import homeReducer from './homeReducer'

export interface AppState {
  debug: boolean
  loaded: boolean
  isUserLogged: boolean
  user: any
  activityFeed: Activity[]
}

const initialState: AppState = {
  debug: true,
  loaded: false,
  isUserLogged: false,
  user: {},
  activityFeed: [],
}

const logInUser = (state: AppState) => ({
  ...state,
  isUserLogged: true,
})

const signOutUser = (state: AppState) => ({
  ...state,
  isUserLogged: false,
  user: {},
  activityFeed: [],
})

const stateLoaded = (state: AppState, { payload: { debug, isUserLogged, user, activityFeed } }: any) => ({
  ...state,
  debug,
  loaded: true,
  isUserLogged,
  user: user ?? state.user,
  activityFeed: activityFeed ?? state.activityFeed,
})

const appReducer = createReducer(initialState, {
  [RootActions.stateLoadSuccess.toString()]: stateLoaded,
  [AuthActions.logInSuccess.toString()]: logInUser,
  [AuthActions.signOutSuccess.toString()]: signOutUser,
})

export interface RootState {
  router: RouterState
  app: AppState
  notifications: NotificationState
  theme: ThemeState
  locale: LocaleState
  settings: any
  modal: any
  dialogs: any
  home: any
}

export const createRootReducer = (history: History): Reducer<CombinedState<RootState>> => combineReducers({
  router: connectRouter(history),
  app: appReducer,
  notifications: notificationsReducer,
  theme: themeReducer,
  locale: localeReducer,
  settings: settingsReducer,
  modal: modalReducer,
  dialogs: dialogsReducer,
  home: homeReducer,
})