import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const loadSettings = (category, tab) =>
  clientApi.get(API.SETTINGS_PREFIX, { params: { category, tab } })

export const updateSettings = (category, tab, inputs) =>
  clientApi.post(API.SETTINGS_PREFIX, { category, tab, inputs })
