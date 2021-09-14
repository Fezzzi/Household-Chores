import { API } from 'shared/constants'
import { apiClient } from 'clientSrc/apiClient'

export const invitationApprove = data =>
  apiClient.put(`${API.HOUSEHOLDS_PREFIX}/${API.INVITATION_APPROVE}`, data)

export const invitationIgnore = data =>
  apiClient.delete(`${API.HOUSEHOLDS_PREFIX}/${API.INVITATION_IGNORE}`, { params: data })

export const createHousehold = data =>
  apiClient.post(`${API.HOUSEHOLDS_PREFIX}/${API.HOUSEHOLD_CREATE}`, data)

export const leaveHousehold = householdId =>
  apiClient.delete(`${API.HOUSEHOLDS_PREFIX}/${API.HOUSEHOLD_LEAVE}`, { params: { householdId } })

export const deleteHousehold = householdId =>
  apiClient.delete(`${API.HOUSEHOLDS_PREFIX}/${API.HOUSEHOLD_DELETE}`, { params: { householdId } })
