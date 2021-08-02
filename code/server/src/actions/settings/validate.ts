import {
  HOUSEHOLD_ROLE_TYPE, INPUT_TYPE, INVITATION_MESSAGE_LENGTH, NOTIFICATION_TYPE, USER_VISIBILITY_TYPE,
} from 'shared/constants'
import { ERROR, INFO } from 'shared/constants/localeMessages'
import { findApprovedConnections, findUser, getUserRole, isCorrectPassword } from 'serverSrc/database'

import { GeneralEditInputs, HouseholdEditInputs } from './types'
import { validateField } from '../validate'

export const validateProfileData = async (inputs: GeneralEditInputs, req: any, res: any): Promise<boolean> => {
  const { nickname, email, oldPassword, newPassword, photo, visibility } = inputs

  const update = nickname !== undefined
    || email !== undefined
    || (oldPassword !== undefined && newPassword !== undefined)
    || photo !== undefined
    || visibility !== undefined

  if (!update) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    return false
  }

  const valid = validateField(res, nickname, INPUT_TYPE.TEXT)
    && validateField(res, photo, INPUT_TYPE.PHOTO)
    && validateField(res, email, INPUT_TYPE.EMAIL)
    && validateField(res, oldPassword, INPUT_TYPE.PASSWORD)
    && validateField(res, newPassword, INPUT_TYPE.PASSWORD)
    && validateField(res, visibility, INPUT_TYPE.SWITCH, [
      USER_VISIBILITY_TYPE.ALL, USER_VISIBILITY_TYPE.FOF,
    ])

  if (!valid) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  if (email !== undefined && await findUser(email) !== null) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.EMAIL_USED] })
    return false
  }

  if (oldPassword && !await isCorrectPassword(oldPassword, req.session.userId)) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INCORRECT_PASS] })
    return false
  }

  return true
}

export const validateEditHouseholdData = async (
  inputs: HouseholdEditInputs,
  members: Array<{ userId: number; role: string }> | null,
  userId: number,
  req: any,
  res: any
): Promise<boolean> => {
  const {
    householdId,
    name,
    photo,
    userNickname,
    userPhoto,
    userRole,
    newInvitations,
    changedRoles,
    removedMembers,
    removedInvitations,
  } = inputs

  const update = name !== undefined
    || photo !== undefined
    || userNickname !== undefined
    || userPhoto !== undefined
    || userRole !== undefined
    || changedRoles !== undefined
    || newInvitations !== undefined
    || removedInvitations !== undefined
    || removedMembers !== undefined

  if (!update) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    return false
  }

  const allRoles = Object.keys(HOUSEHOLD_ROLE_TYPE)
  // Querying user's role in given household also checks whether is user a member
  const currentUserRole = await getUserRole(userId, householdId)
  if (!(householdId !== undefined && currentUserRole !== null
    && validateField(res, name, INPUT_TYPE.TEXT)
    && validateField(res, photo, INPUT_TYPE.PHOTO)
    && validateField(res, userNickname, INPUT_TYPE.TEXT)
    && validateField(res, userPhoto, INPUT_TYPE.PHOTO)
    && validateField(res, userRole, INPUT_TYPE.SWITCH, allRoles)
  )) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  const currentUserRoleIndex = currentUserRole && allRoles.indexOf(currentUserRole)
  if ((photo && currentUserRole !== HOUSEHOLD_ROLE_TYPE.ADMIN)
    || (name && currentUserRole !== HOUSEHOLD_ROLE_TYPE.ADMIN)
    || (removedMembers && currentUserRole !== HOUSEHOLD_ROLE_TYPE.ADMIN)
    || (removedInvitations && currentUserRole === HOUSEHOLD_ROLE_TYPE.MEMBER)
    || (newInvitations && currentUserRole === HOUSEHOLD_ROLE_TYPE.MEMBER)
    || (changedRoles && changedRoles.find(({ role }) => allRoles.indexOf(role) < currentUserRoleIndex))
  ) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.BAD_PERMISSIONS] })
    return false
  }

  if (newInvitations?.length > 0) {
    const connections = await findApprovedConnections(userId)
    const connectionIds = connections.map(({ userId }) => userId)
    const valid = newInvitations.every(({ userId }) => connectionIds.indexOf(userId) !== -1)
    if (!valid) {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
      return false
    }
    const validMessages = newInvitations.every(({ message }) => !message
      || validateField(res, message, INPUT_TYPE.TEXT_AREA, { max: INVITATION_MESSAGE_LENGTH }))
    if (!validMessages) {
      return false
    }
  }

  if (userRole || changedRoles?.length > 0 || removedMembers?.length > 0) {
    const admins = members?.filter(({ userId, role }) =>
      !removedMembers?.includes(userId)
      && role === HOUSEHOLD_ROLE_TYPE.ADMIN
      && !changedRoles?.find(changedRole => userId === changedRole.userId && changedRole.role !== HOUSEHOLD_ROLE_TYPE.ADMIN))

    if (!admins || admins.length === 0) {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ADMIN_REQUIRED] })
      return false
    }
  }

  return true
}
