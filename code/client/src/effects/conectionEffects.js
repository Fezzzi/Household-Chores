import { apiClient } from 'clientSrc/apiClient'
import { API } from 'shared/constants'

export const findUsers = query =>
  apiClient.get(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_FIND}`, { params: { query } })

export const connectionRequest = data =>
  apiClient.post(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_REQUEST}`, data)

export const connectionApprove = data =>
  apiClient.put(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_APPROVE}`, data)

export const connectionBlock = targetId =>
  apiClient.put(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_BLOCK}`, { targetId })

export const connectionIgnore = targetId =>
  apiClient.delete(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_IGNORE}`, { params: { targetId } })

export const connectionRemove = targetId =>
  apiClient.delete(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_REMOVE}`, { params: { targetId } })

export const connectionUnblock = targetId =>
  apiClient.delete(`${API.CONNECTIONS_PREFIX}/${API.CONNECTION_UNBLOCK}`, { params: { targetId } })
