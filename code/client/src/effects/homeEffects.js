import { API } from 'shared/constants'
import { apiClient } from 'clientSrc/apiClient'

export const loadHouseholds = () =>
  apiClient.get(`${API.HOUSEHOLDS_PREFIX}/${API.HOUSEHOLDS_LOAD}`)
