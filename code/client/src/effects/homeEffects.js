import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const loadHouseholds = () =>
  clientApi.get(`${API.HOUSEHOLDS_PREFIX}/${API.HOUSEHOLDS_LOAD}`)
