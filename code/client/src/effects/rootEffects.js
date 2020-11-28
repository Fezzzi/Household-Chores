import { LOAD_PREFIX, LOAD_STATE } from 'shared/constants/api'
import { clientApi } from 'clientSrc/client-api'

export const loadState = () => clientApi.get(`${LOAD_PREFIX}/${LOAD_STATE}`)
