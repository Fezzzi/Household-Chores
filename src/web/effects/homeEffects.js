import { API } from 'shared/constants'

import { apiClient } from '../apiClient'

export const loadHouseholds = () =>
  apiClient.get(`${API.HOUSEHOLDS_PREFIX}/${API.HOUSEHOLDS_LOAD}`)
