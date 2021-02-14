import { clientApi } from 'clientSrc/client-api'
import { API } from 'shared/constants'

export const findUsers = query =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_FIND}`, { query })

export const connectionRequest = data =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_REQUEST}`, data)

export const connectionApprove = userId =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_APPROVE}`, { userId })

export const connectionBlock = userId =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_BLOCK}`, { userId })

export const connectionIgnore = userId =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_IGNORE}`, { userId })

export const connectionRemove = userId =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_REMOVE}`, { userId })

export const connectionUnblock = userId =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_UNBLOCK}`, { userId })
