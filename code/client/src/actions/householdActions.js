import { createAction } from '@reduxjs/toolkit'

export const approveInvitation = createAction('APPROVE_INVITATION')
export const ignoreInvitation = createAction('IGNORE_INVITATION')

export const createHousehold = createAction('CREATE_HOUSEHOLD')
export const leaveHousehold = createAction('LEAVE_HOUSEHOLD')
export const deleteHousehold = createAction('DELETE_HOUSEHOLD')
