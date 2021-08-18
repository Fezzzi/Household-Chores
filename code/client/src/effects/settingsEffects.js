import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const loadSettings = payload =>
  clientApi.get(API.SETTINGS_PREFIX, { params: payload })

export const updateProfile = payload =>
  clientApi.put(`${API.SETTINGS_PREFIX}/${API.UPDATE_PROFILE}`, payload)

export const updateLocale = payload =>
  clientApi.put(`${API.SETTINGS_PREFIX}/${API.UPDATE_LOCALE}`, payload)
