import { createAction } from '@reduxjs/toolkit'

export const connectionAction = createAction('CONNECTION_ACTION')
export const searchConnectionAction = createAction('SEARCH_CONNECTION_ACTION')
export const connectionRequest = createAction('CONNECTION_REQUEST')
export const connectionRequestSuccess = createAction('CONNECTION_REQUEST_SUCCESS')
