import { API } from 'shared/constants'
import { apiClient } from 'clientSrc/apiClient'

export const loadState = () =>
  apiClient.get(`${API.LOAD_PREFIX}/${API.LOAD_STATE}`)
