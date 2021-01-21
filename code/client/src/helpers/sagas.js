import { put, call } from 'redux-saga/effects'

import { NotificationActions } from 'clientSrc/actions'
import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

/**
 * Tests response for ERRORS and dispatches them through Notification actions or calls callback if none present.
 */
export function* handleResponse({ data }, onSuccess) {
  if (!data[NOTIFICATION_TYPE.ERRORS] || !data[NOTIFICATION_TYPE.ERRORS].length) {
    if (onSuccess) {
      yield call(onSuccess, data)
    }
  } else {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: data[NOTIFICATION_TYPE.ERRORS],
    }))
  }
}

/**
 * Should be used around every saga that performs API calls.
 * Wraps API calls with try/catch block and dispatches Notification action with CONNECTION_ERROR on API call exception.
 */
export function* sagaWrapper(data, callback) {
  try {
    yield call(callback, data)
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

/**
 * Universal saga that performs API call with provided effect and payload.
 * API call exceptions and response exceptions are dispatched through Notification actions.
 * Calls callback function on response data of successful API call.
 */
export function* generalSaga(effect, payload, callback) {
  try {
    const response = yield call(effect, payload)
    yield call(handleResponse, response, callback)
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}
