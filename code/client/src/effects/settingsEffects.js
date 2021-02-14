import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const loadSettings = payload => clientApi.get(API.SETTINGS_PREFIX, { params: payload })

export const updateSettings = payload => clientApi.put(API.SETTINGS_PREFIX, payload)
