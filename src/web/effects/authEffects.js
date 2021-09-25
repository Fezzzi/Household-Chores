import { API } from 'shared/constants'

import { apiClient } from '../apiClient'

export const signUp = data =>
  apiClient.post(`${API.AUTH_PREFIX}/${API.AUTH_SIGN_UP}`, data)

export const logIn = data =>
  apiClient.put(`${API.AUTH_PREFIX}/${API.AUTH_LOG_IN}`, data)

export const logOut = () =>
  // eslint-disable-next-line import/namespace
  apiClient.put(`${API.AUTH_PREFIX}/${API.AUTH_SIGN_OUT}`)

export const resetPass = data =>
  apiClient.put(`${API.AUTH_PREFIX}/${API.AUTH_RESET}`, data)

export const deleteAccount = () =>
  apiClient.delete(`${API.AUTH_PREFIX}/${API.AUTH_DELETE}`)
