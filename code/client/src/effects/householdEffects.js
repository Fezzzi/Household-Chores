import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const invitationApprove = data =>
  clientApi.put(`${API.HOUSEHOLDS_PREFIX}/${API.INVITATION_APPROVE}`, data)

export const invitationIgnore = data =>
  clientApi.delete(`${API.HOUSEHOLDS_PREFIX}/${API.INVITATION_IGNORE}`, { params: data })

export const createHousehold = data =>
  clientApi.post(`${API.HOUSEHOLDS_PREFIX}/${API.HOUSEHOLD_CREATE}`, data)

export const leaveHousehold = householdId =>
  clientApi.delete(`${API.HOUSEHOLDS_PREFIX}/${API.HOUSEHOLD_LEAVE}`, { params: { householdId } })

export const deleteHousehold = householdId =>
  clientApi.delete(`${API.HOUSEHOLDS_PREFIX}/${API.HOUSEHOLD_DELETE}`, { params: { householdId } })
