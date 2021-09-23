import { API } from 'shared/constants'

import { apiClient } from '../apiClient'

export const loadState = () =>
  apiClient.get(`${API.LOAD_PREFIX}/${API.LOAD_STATE}`)
