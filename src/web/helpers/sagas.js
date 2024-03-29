import { put, call } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

import { NotificationActions } from '../actions'

/**
 * Tests response for ERRORS and dispatches them through Notification actions or calls callback if none present.
 */
export function* handleResponse ({ data }, onSuccess, onError) {
  if (!data[NOTIFICATION_TYPE.ERRORS] || !data[NOTIFICATION_TYPE.ERRORS].length) {
    if (onSuccess) {
      yield call(onSuccess, data)
    }
  } else {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: data[NOTIFICATION_TYPE.ERRORS],
    }))

    if (onError) {
      onError()
    }
  }
}

/**
 * Universal saga that performs API call with provided effect and payload.
 * API call exceptions and response exceptions are dispatched through Notification actions.
 * Calls callback function on response data of successful API call.
 */
export function* generalSaga (effect, payload, onSuccess, onError) {
  try {
    const response = yield call(effect, payload)
    yield call(handleResponse, response, onSuccess, onError)
  } catch (error) {
    if (error.response?.data) {
      yield put(NotificationActions.addNotifications(error.response.data))
    } else {
      yield put(NotificationActions.addNotifications({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR] }))
    }

    if (onError != null) {
      onError()
    }
  }
}
