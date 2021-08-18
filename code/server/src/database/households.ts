import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { HouseholdChangedRole, HouseholdNewInvitation } from 'serverSrc/actions/settings/types'
import { HouseholdCreationError } from 'serverSrc/helpers/errors'

import { database } from './database'
import { getHouseholdsMembersMap } from './householdMembers'
import { getHouseholdsInvitationsMap } from './householdInvitations'
import {
  tHouseholdsName, tHouseholdsCols,
  tHouseInvName, tHouseInvCols,
  tHouseMemName, tHouseMemCols,
  THouseholdsType,
  THouseMemType,
} from './tables'
import {
  HouseholdDbType,
  HouseholdEditMemberUnforcedDbType,
  HouseholdEditUnforcedDbType,
  mapToHouseholdApiType,
} from './mappers'

export const getUserHouseholds = async (currentUser: number) => {
  const results = await database.query<HouseholdDbType>(`
    SELECT households.${tHouseholdsCols.household_id}, households.${tHouseholdsCols.name},
      households.${tHouseholdsCols.photo}, households.${tHouseholdsCols.date_created},
      CONCAT('household-', households.${tHouseholdsCols.household_id}) AS "key"
    FROM ${tHouseholdsName} AS households
    INNER JOIN ${tHouseMemName} AS members
      ON households.${tHouseholdsCols.household_id}=members.${tHouseMemCols.household_id}
      AND members.${tHouseMemCols.user_id}=${currentUser}
  `)

  return results.map(mapToHouseholdApiType)
}

export const getUserHouseholdsData = (currentUser: number, withMembers = false, withInvitations = false) =>
  database.withTransaction(async () => {
    const households = await getUserHouseholds(currentUser)

    if (!withMembers && !withInvitations || households.length === 0) {
      return households
    }

    const householdIds = households.map(household => household.householdId)
    const membersMap = withMembers
      ? await getHouseholdsMembersMap(householdIds)
      : {}

    const invitationsMap = withInvitations
      ? await getHouseholdsInvitationsMap(householdIds)
      : {}

    return households.map(household => ({
      members: membersMap[household.householdId] ?? [],
      invitations: invitationsMap[household.householdId] ?? [],
      ...household,
    }))
  })

export const createHousehold = (
  householdName: string,
  householdPhoto: string,
  userNickname: string,
  userPhoto: string,
  currentUserId: number
) =>
  database.withTransaction(async (): Promise<number> => {
    const result = await database.query<
      Pick<THouseholdsType, typeof tHouseholdsCols.household_id>
    >(`
      INSERT INTO ${tHouseholdsName} (
        ${tHouseholdsCols.name}, ${tHouseholdsCols.photo}, ${tHouseholdsCols.date_created}
      ) VALUES ($1, $2, NOW())
      RETURNING ${tHouseholdsCols.household_id}
    `, [householdName, householdPhoto])

    const newHouseholdId = result[0]?.[tHouseholdsCols.household_id]
    if (newHouseholdId) {
      await database.query(`
        INSERT INTO ${tHouseMemName}
        VALUES (${newHouseholdId}, ${currentUserId}, ${currentUserId}, '${HOUSEHOLD_ROLE_TYPE.ADMIN}', $1, $2, NOW())
      `, [userNickname, userPhoto])

      return Number(newHouseholdId)
    }

    throw new HouseholdCreationError('Household creation failed.')
  })

export const editHousehold = (
  householdId: number,
  memberData: HouseholdEditMemberUnforcedDbType,
  householdData: HouseholdEditUnforcedDbType,
  newInvitations: HouseholdNewInvitation[],
  changedRoles: HouseholdChangedRole[],
  removedMembers: number[],
  removedInvitations: number[],
  currentId: number
) =>
  database.withTransaction(async () => {
    if (removedInvitations?.length) {
      await database.queryBool(`
        DELETE FROM ${tHouseInvName}
        WHERE ${tHouseInvCols.to_id} IN ($1) AND ${tHouseInvCols.household_id}=$2
      `, [removedInvitations.join(', '), householdId])
    }

    if (newInvitations?.length) {
      await database.queryBool(`
        INSERT INTO ${tHouseInvName}
        VALUES (${newInvitations.map((_, index) => `${householdId}, ${currentId}, $${index * 2 + 1}, $${index * 2 + 2}, NOW()`).join('),(')})
      `, newInvitations.flatMap(user => [user.userId, user.message ?? '']))
    }

    if (removedMembers?.length) {
      await database.queryBool(`
        DELETE FROM ${tHouseMemName}
        WHERE ${tHouseMemCols.user_id} IN ($1) AND ${tHouseMemCols.household_id}=$2
      `, [removedMembers.join(', '), householdId])
    }

    if (changedRoles?.length) {
      await database.queryBool(`
        INSERT INTO ${tHouseMemName} (
          ${tHouseMemCols.household_id}, ${tHouseMemCols.user_id}, ${tHouseMemCols.from_id},
          ${tHouseMemCols.role}, ${tHouseMemCols.date_joined}
        ) VALUES (${changedRoles.map((_, index) => `${householdId}, $${index * 2 + 1}, ${currentId}, $${index * 2 + 2}, NOW()`).join('),(')})
        ON DUPLICATE KEY UPDATE
          ${tHouseMemCols.role}=VALUES(${tHouseMemCols.role})
      `, changedRoles.flatMap(({ userId, role }) => [userId, role]))
    }

    const memberDataEntries = Object.entries(memberData).filter(([, val]) => val !== undefined)
    if (memberDataEntries.length > 0) {
      await database.queryBool(`
        UPDATE ${tHouseMemName} SET ${
          memberDataEntries
            .map(([key], index) => `${key}=$${index + 1}`)
            .join(', ')
        } WHERE ${tHouseMemCols.user_id}=${currentId} AND ${tHouseMemCols.household_id}=$${memberDataEntries.length + 1}
      `, [...memberDataEntries.map(([, val]) => val), householdId])
    }

    const householdDataEntries = Object.entries(householdData).filter(([, val]) => val !== undefined)
    if (householdDataEntries.length > 0) {
      await database.queryBool(`
        UPDATE ${tHouseholdsName} SET ${
          householdDataEntries
            .map(([key], index) => `${key}=$${index + 1}`)
            .join(', ')
        } WHERE ${tHouseholdsCols.household_id}=$${householdDataEntries.length + 1}
      `, [...householdDataEntries.map(([, val]) => val), householdId])
    }
  })

export const deleteHousehold = (householdId: number) =>
  database.queryBool(`
    DELETE FROM ${tHouseholdsName}
    WHERE ${tHouseholdsCols.household_id}=$1
  `, [householdId])

export const leaveHousehold = (userId: number, householdId: number) =>
  database.queryBool(`
    DELETE FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.household_id}=$1 AND ${tHouseMemCols.user_id}=${userId}
  `, [householdId])

export const getUserRole = async (userId: number, householdId: number) => {
  const role = await database.query<
    Pick<THouseMemType, typeof tHouseMemCols.role>
  >(`
    SELECT ${tHouseMemCols.role}
    FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.user_id}=${userId} AND ${tHouseMemCols.household_id}=$1
    LIMIT 1
  `, [householdId])

  return role?.[0][tHouseMemCols.role] ?? null
}

export const getHouseholdName = async (householdId: number) => {
  const householdNames = await database.query<
    Pick<THouseholdsType, typeof tHouseholdsCols.name>
  >(`
    SELECT ${tHouseholdsCols.name}
    FROM ${tHouseholdsName}
    WHERE ${tHouseholdsCols.household_id}=$1
    LIMIT 1
  `, [householdId])

  return householdNames[0]
    ? String(householdNames[0][tHouseholdsCols.name])
    : null
}
