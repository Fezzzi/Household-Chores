import { clientApi } from 'clientSrc/client-api'
import { API } from 'shared/constants'

export const findUsers = query =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_FIND}`, { query })

export const connectionRequest = data =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_REQUEST}`, data)

export const connectionApprove = targetId =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_APPROVE}`, { targetId })

export const connectionBlock = targetId =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_BLOCK}`, { targetId })

export const connectionIgnore = targetId =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_IGNORE}`, { targetId })

export const connectionRemove = targetId =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_REMOVE}`, { targetId })

export const connectionUnblock = targetId =>
  clientApi.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_UNBLOCK}`, { targetId })
