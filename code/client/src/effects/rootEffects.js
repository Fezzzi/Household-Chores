import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const loadState = () =>
  clientApi.get(`${API.LOAD_PREFIX}/${API.LOAD_STATE}`)
