import { clientApi } from 'clientSrc/client-api'
import { API } from 'shared/constants'

export const findUsers = query =>
  clientApi.get(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_FIND}`, { params: { query } })

export const connectionRequest = data =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_REQUEST}`, data)

export const connectionApprove = userId =>
  clientApi.put(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_APPROVE}`, { userId })

export const connectionBlock = userId =>
  clientApi.put(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_BLOCK}`, { userId })

export const connectionIgnore = userId =>
  clientApi.delete(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_IGNORE}`, { params: { userId } })

export const connectionRemove = userId =>
  clientApi.delete(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_REMOVE}`, { params: { userId } })

export const connectionUnblock = userId =>
  clientApi.delete(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_UNBLOCK}`, { params: { userId } })
