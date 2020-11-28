import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const invitationApprove = data =>
  clientApi.post(`${API.HOUSEHOLDS_PREFIX}/${API.INVITATION_APPROVE}`, data)

export const invitationIgnore = data =>
  clientApi.post(`${API.HOUSEHOLDS_PREFIX}/${API.INVITATION_IGNORE}`, data)

export const createHousehold = data =>
  clientApi.post(`${API.HOUSEHOLDS_PREFIX}/${API.HOUSEHOLD_CREATE}`, data)
