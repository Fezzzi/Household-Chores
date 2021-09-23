import { API } from 'shared/constants'

import { apiClient } from '../apiClient'

export const loadSettings = payload =>
  apiClient.get(API.SETTINGS_PREFIX, { params: payload })

export const updateProfile = payload =>
  apiClient.put(`${API.SETTINGS_PREFIX}/${API.UPDATE_PROFILE}`, payload)

export const updateLocale = payload =>
  apiClient.put(`${API.SETTINGS_PREFIX}/${API.UPDATE_LOCALE}`, payload)
