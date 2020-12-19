import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const loadState = () => clientApi.get(`${API.GENERAL_PREFIX}/${API.LOAD_STATE}`)
