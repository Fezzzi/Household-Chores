import {
  findApprovedConnections, findUser, getHouseholdMembers, getUserRole, isCorrectPassword,
} from 'serverSrc/database/models'
import { tDialogsCols, tHouseholdsCols, tNotifySettingsCols } from 'serverSrc/database/models/tables'
import {
  INPUT_TYPE, NOTIFICATION_TYPE, USER_VISIBILITY_TYPE,
  SETTING_CATEGORIES, HOUSEHOLD_TABS, SETTING_TAB_ROWS, HOUSEHOLD_ROLE_TYPE, INVITATION_MESSAGE_LENGTH,
} from 'shared/constants'
import { HOUSEHOLD_KEYS, INVITATION_KEYS, PROFILE } from 'shared/constants/mappingKeys'
import { ERROR, INFO } from 'shared/constants/localeMessages'
import { isInputValid } from 'shared/helpers/validation'
import { deApify } from 'serverSrc/helpers/api'

export const getTabList = (
  data: any,
  category: string
): { tabs: string[]; messages: object; types: object } => {
  switch (category) {
    case SETTING_CATEGORIES.HOUSEHOLDS: return {
      tabs: [
        ...SETTING_TAB_ROWS[category],
        ...data.households.map((household: any) => household.key),
      ],
      messages: Object.fromEntries(
        data.households.map((household: any) => [
          household.key,
          household[tHouseholdsCols.name],
        ]),
      ),
      types: Object.fromEntries(
        data.households.map((household: any) => [
          household.key,
          HOUSEHOLD_TABS._HOUSEHOLD,
        ]),
      ),
    }
    default: return { tabs: SETTING_TAB_ROWS[category], messages: {}, types: {} }
  }
}

export const validateField = (
  res: any,
  field: string | number | undefined,
  type: string,
  constraints?: any
): boolean => {
  if (field !== undefined) {
    const validity = isInputValid(type, field, constraints)
    if (!validity.valid) {
      res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [validity.message || ERROR.INVALID_DATA] })
      return false
    }
  }
  return true
}

export const validateProfileData = async (
  inputs: Record<string, string | number>,
  req: any,
  res: any
): Promise<boolean> => {
  const update = inputs[PROFILE.NAME] !== undefined
    || inputs[PROFILE.EMAIL] !== undefined
    || (inputs[PROFILE.OLD_PASSWORD] !== undefined && inputs[PROFILE.NEW_PASSWORD] !== undefined)
    || inputs[PROFILE.PHOTO] !== undefined
    || inputs[PROFILE.CONNECTION_VISIBILITY] !== undefined

  if (!update) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    return false
  }

  const valid = validateField(res, inputs[PROFILE.NAME], INPUT_TYPE.TEXT)
    && validateField(res, inputs[PROFILE.PHOTO], INPUT_TYPE.PHOTO)
    && validateField(res, inputs[PROFILE.EMAIL], INPUT_TYPE.EMAIL)
    && validateField(res, inputs[PROFILE.OLD_PASSWORD], INPUT_TYPE.PASSWORD)
    && validateField(res, inputs[PROFILE.NEW_PASSWORD], INPUT_TYPE.PASSWORD)
    && validateField(res, inputs[PROFILE.CONNECTION_VISIBILITY], INPUT_TYPE.SWITCH, [
      USER_VISIBILITY_TYPE.ALL, USER_VISIBILITY_TYPE.FOF,
    ])

  if (!valid) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  if (inputs[PROFILE.EMAIL] !== undefined && await findUser(inputs[PROFILE.EMAIL] as string) !== null) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.EMAIL_USED] })
    return false
  }

  if (inputs[PROFILE.OLD_PASSWORD]
    && !await isCorrectPassword(inputs[PROFILE.OLD_PASSWORD] as string, req.session.user)
  ) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INCORRECT_PASS] })
    return false
  }

  return true
}

export const tryRemapBoolData = (
  inputs: Record<string, string | number>,
  allowedKeys: string[],
  valueMapper: (val: string | number) => number,
  req: any,
  res: any
): Record<string, number> | null => {
  const inputEntries = Object.entries(deApify(inputs))
  if (inputEntries.length === 0) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    return null
  }

  if (!inputEntries.every(([name]) => allowedKeys.includes(name))) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return null
  }
  return Object.fromEntries(inputEntries.map(([name, value]) => [name, valueMapper(value)]))
}

export const validateEditHouseholdData = async (
  inputs: Record<string, any>,
  userId: number,
  req: any,
  res: any
): Promise<boolean> => {
  const {
    [HOUSEHOLD_KEYS.USER_ROLE]: userRole,
    [HOUSEHOLD_KEYS.INVITED_CONNECTIONS]: newInvitations,
    [HOUSEHOLD_KEYS.CHANGED_ROLES]: changedRoles,
    [HOUSEHOLD_KEYS.REMOVED_MEMBERS]: removedMembers,
    [HOUSEHOLD_KEYS.REMOVED_INVITATIONS]: removedInvitations,
  } = inputs

  const update = inputs[HOUSEHOLD_KEYS.NAME] !== undefined
    || inputs[HOUSEHOLD_KEYS.PHOTO] !== undefined
    || inputs[HOUSEHOLD_KEYS.USER_NAME] !== undefined
    || inputs[HOUSEHOLD_KEYS.USER_PHOTO] !== undefined
    || userRole !== undefined
    || changedRoles !== undefined
    || newInvitations !== undefined
    || removedInvitations !== undefined
    || removedMembers !== undefined

  if (!update) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    return false
  }

  const allRoles = Object.keys(HOUSEHOLD_ROLE_TYPE)
  const householdId = inputs[HOUSEHOLD_KEYS.ID]
  // Querying user's role in given household also checks whether is user a member
  const currentUserRole = await getUserRole(userId, householdId)
  if (!(householdId !== undefined && currentUserRole !== null
    && validateField(res, inputs[HOUSEHOLD_KEYS.NAME], INPUT_TYPE.TEXT)
    && validateField(res, inputs[HOUSEHOLD_KEYS.PHOTO], INPUT_TYPE.PHOTO)
    && validateField(res, inputs[HOUSEHOLD_KEYS.USER_NAME], INPUT_TYPE.TEXT)
    && validateField(res, inputs[HOUSEHOLD_KEYS.USER_PHOTO], INPUT_TYPE.PHOTO)
    && validateField(res, userRole, INPUT_TYPE.SWITCH, allRoles)
  )) {
    return false
  }

  const currentUserRoleIndex = currentUserRole && allRoles.indexOf(currentUserRole)
  if ((inputs[HOUSEHOLD_KEYS.PHOTO] && currentUserRole !== HOUSEHOLD_ROLE_TYPE.ADMIN)
    || (inputs[HOUSEHOLD_KEYS.NAME] && currentUserRole !== HOUSEHOLD_ROLE_TYPE.ADMIN)
    || (removedMembers && currentUserRole !== HOUSEHOLD_ROLE_TYPE.ADMIN)
    || (removedInvitations && currentUserRole === HOUSEHOLD_ROLE_TYPE.MEMBER)
    || (newInvitations && currentUserRole === HOUSEHOLD_ROLE_TYPE.MEMBER)
    || (changedRoles && changedRoles.find(({ role }: { role: string }) => allRoles.indexOf(role) < currentUserRoleIndex))
  ) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.BAD_PERMISSIONS] })
    return false
  }

  if (newInvitations?.length > 0) {
    const invitations = newInvitations as Array<Record<string, string | number>>
    const connections = await findApprovedConnections(userId)
    const connectionIds = connections.map(({ id }) => id)
    const valid = invitations.every(({ id }) => connectionIds.indexOf(id) !== -1)
    if (!valid) {
      res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
      return false
    }
    const validMessages = invitations.every(({ [INVITATION_KEYS.MESSAGE]: message }) => !message
      || validateField(res, message, INPUT_TYPE.TEXT_AREA, { max: INVITATION_MESSAGE_LENGTH }))
    if (!validMessages) {
      return false
    }
  }

  if (userRole || changedRoles?.length > 0 || removedMembers?.length > 0) {
    const admins = (await getHouseholdMembers(householdId))
      ?.filter(({ id, role }) => !removedMembers?.includes(id)
        && role === HOUSEHOLD_ROLE_TYPE.ADMIN
        && !changedRoles?.find((changedRole: any) => id === changedRole.id && changedRole.role !== HOUSEHOLD_ROLE_TYPE.ADMIN))

    if (!admins || admins.length === 0) {
      res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ADMIN_REQUIRED] })
      return false
    }
  }

  return true
}
