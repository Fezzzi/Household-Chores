import { createAction } from '@reduxjs/toolkit'

import { Activity, User } from 'shared/apiTypes'

export interface FeedLoadPayload {
  page: number
  pageSize?: number
  callbackFunc?: (data: Activity[]) => void
}

export interface StateLoadedPayload {
  debug: boolean
  isUserLogged: boolean
  user?: User
  activityFeed?: Activity[]
}

export const LoadActions = {
  stateLoad: createAction<{}>('STATE_LOAD'),
  stateLoadSuccess: createAction<StateLoadedPayload>('STATE_LOAD_SUCCESS'),
  feedLoad: createAction<FeedLoadPayload>('FEED_LOAD'),
  feedLoadSuccess: createAction<Activity[]>('FEED_LOAD_SUCCESS'),
}
