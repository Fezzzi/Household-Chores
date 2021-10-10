import { History } from 'history'
import { createReducer, combineReducers, Reducer, CombinedState, PayloadAction } from '@reduxjs/toolkit'
import { connectRouter, RouterState } from 'connected-react-router'

import { Activity, User } from 'shared/apiTypes'

import { LoadActions, AuthActions, StateLoadedPayload } from '../actions'
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
  user: User | null
  activityFeed: Activity[]
}

const initialState: AppState = {
  debug: true,
  loaded: false,
  isUserLogged: false,
  user: null,
  activityFeed: [],
}

const logInUser = (state: AppState) => ({
  ...state,
  isUserLogged: true,
})

const signOutUser = (state: AppState) => ({
  ...state,
  isUserLogged: false,
  user: null,
  activityFeed: [],
})

const stateLoaded = (
  state: AppState,
  { payload: { debug, isUserLogged, user, activityFeed } }: PayloadAction<StateLoadedPayload>
) => ({
  ...state,
  debug,
  loaded: true,
  isUserLogged,
  user: user ?? state.user,
  activityFeed: activityFeed ?? state.activityFeed,
})

const feedLoaded = (state: AppState, { payload }: PayloadAction<Activity[]>) => ({
  ...state,
  // We don't need to sort the array since set keeps insertion order
  activityFeed: Array.from([...state.activityFeed, ...payload]
    .reduce((acc, activity) => {
      if (!acc.has(activity.id)) {
        acc.set(activity.id, activity)
      }
      return acc
    }, new Map<number, Activity>())
    .values()
  ).sort((a1, a2) => new Date(a2.dateCreated).getTime() - new Date(a1.dateCreated).getTime()),
})

const appReducer = createReducer(initialState, {
  [LoadActions.stateLoadSuccess.toString()]: stateLoaded,
  [LoadActions.feedLoadSuccess.toString()]: feedLoaded,
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
