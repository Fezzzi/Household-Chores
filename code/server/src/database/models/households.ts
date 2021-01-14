import { database } from 'serverSrc/database'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { HOUSEHOLD_GROUP_KEYS, HOUSEHOLD_KEYS, INVITATION_KEYS, MEMBER_KEYS } from 'shared/constants/settingsDataKeys'

import {
  tHouseholdsName, tHouseholdsCols, tHouseInvName, tHouseInvCols,
  tHouseMemName, tHouseMemCols, tUsersName, tUsersCols,
} from './tables'

export const findUserInvitations = async (currentUser: number): Promise<Array<object>> => {
  const result = await database.query(`
    SELECT ${tHouseInvCols.id_household}, h.${tHouseholdsCols.name}, h.${tHouseholdsCols.photo},
      ${tHouseInvCols.id_from}, u.${tUsersCols.nickname}, u.${tUsersCols.photo} AS u_photo,
      ${tHouseInvCols.message} 
    FROM ${tHouseInvName}
    INNER JOIN ${tHouseholdsName} AS h ON ${tHouseInvCols.id_household} = h.${tHouseholdsCols.id}
    LEFT JOIN ${tUsersName} AS u ON ${tHouseInvCols.id_from} = u.${tUsersCols.id}
    WHERE ${tHouseInvCols.id_to}=${currentUser}
  `)

  return result.map((invitation: any) => ({
    [INVITATION_KEYS.HOUSEHOLD_ID]: invitation[tHouseInvCols.id_household],
    [INVITATION_KEYS.HOUSEHOLD_NAME]: invitation[tHouseholdsCols.name],
    [INVITATION_KEYS.HOUSEHOLD_PHOTO]: invitation[tHouseholdsCols.photo],
    [INVITATION_KEYS.FROM_ID]: invitation[tHouseInvCols.id_from],
    [INVITATION_KEYS.FROM_NICKNAME]: invitation[tUsersCols.nickname],
    [INVITATION_KEYS.FROM_PHOTO]: invitation.u_photo,
    [INVITATION_KEYS.MESSAGE]: invitation[tHouseInvCols.message],
  }))
}

export const findUserHouseholds = async (currentUser: number): Promise<Array<object>> => {
  const households = await database.query(`
    SELECT households.${tHouseholdsCols.id}, households.${tHouseholdsCols.name} AS h_name,
      households.${tHouseholdsCols.photo} AS h_photo, CONCAT('household-', households.${tHouseholdsCols.id}) AS "key",
      households.${tHouseholdsCols.date_created} AS h_created,
      invitations.${tHouseInvCols.id_from}, invitations.${tHouseInvCols.id_to}, invitations.${tHouseInvCols.message},
      invitations.${tHouseInvCols.date_created}, users.${tUsersCols.nickname}, users.${tUsersCols.photo} AS u_photo,
      members.${tHouseMemCols.role}, members.${tHouseMemCols.id_user}, members.${tHouseMemCols.date_joined},
      members.${tHouseMemCols.name}, members.${tHouseMemCols.photo}
    FROM ${tHouseholdsName} AS households
    INNER JOIN ${tHouseMemName} AS mems
      ON households.${tHouseholdsCols.id}=mems.${tHouseMemCols.id_household} AND mems.${tHouseMemCols.id_user}=${currentUser}
    LEFT JOIN ${tHouseInvName} AS invitations ON households.${tHouseholdsCols.id}=invitations.${tHouseInvCols.id_household}
    LEFT JOIN ${tUsersName} AS users ON users.${tUsersCols.id}=invitations.${tHouseInvCols.id_to}
    LEFT JOIN ${tHouseMemName} AS members ON households.${tHouseholdsCols.id}=members.${tHouseInvCols.id_household}
  `)
  return Object.values(households.reduce((acc: any, household: any) => {
    const householdId = household[tHouseholdsCols.id]
    if (acc[householdId] === undefined) {
      acc[householdId] = {
        [HOUSEHOLD_KEYS.ID]: household[tHouseholdsCols.id],
        [HOUSEHOLD_KEYS.NAME]: household.h_name,
        [HOUSEHOLD_KEYS.PHOTO]: household.h_photo,
        [HOUSEHOLD_KEYS.KEY]: household.key,
        [HOUSEHOLD_KEYS.DATE_CREATED]: household.h_created,
        [HOUSEHOLD_GROUP_KEYS.MEMBERS]: [],
        [HOUSEHOLD_GROUP_KEYS.INVITATIONS]: [],
      }
    }
    if (household[tHouseInvCols.id_to] && household[tHouseInvCols.id_from]
      && !acc[householdId][HOUSEHOLD_GROUP_KEYS.INVITATIONS].find((invitation: any) =>
        invitation[INVITATION_KEYS.TO_ID] === household[tHouseInvCols.id_to])
    ) {
      acc[householdId][HOUSEHOLD_GROUP_KEYS.INVITATIONS].push({
        [INVITATION_KEYS.FROM_ID]: household[tHouseInvCols.id_from],
        [INVITATION_KEYS.TO_ID]: household[tHouseInvCols.id_to],
        [INVITATION_KEYS.TO_NICKNAME]: household[tUsersCols.nickname],
        [INVITATION_KEYS.TO_PHOTO]: household.u_photo,
        [INVITATION_KEYS.MESSAGE]: household[tHouseInvCols.message],
        [INVITATION_KEYS.DATE_CREATED]: household[tHouseInvCols.date_created],
      })
    }
    if (household[tHouseMemCols.id_user]
      && !acc[householdId][HOUSEHOLD_GROUP_KEYS.MEMBERS].find((member: any) =>
        member[MEMBER_KEYS.ID] === household[tHouseMemCols.id_user])
    ) {
      acc[householdId][HOUSEHOLD_GROUP_KEYS.MEMBERS].push({
        [MEMBER_KEYS.ID]: household[tHouseMemCols.id_user],
        [MEMBER_KEYS.ROLE]: household[tHouseMemCols.role],
        [MEMBER_KEYS.NAME]: household[tHouseMemCols.name],
        [MEMBER_KEYS.PHOTO]: household[tHouseMemCols.photo],
        [MEMBER_KEYS.DATE_JOINED]: household[tHouseMemCols.date_joined],
      })
    }
    return acc
  }, {}))
}

export const addHouseholdInvitations = async (
  householdId: number,
  invitations: Array<Record<string, string | number>>,
  currentId: number,
): Promise<boolean> =>
  database.query(`
    INSERT INTO ${tHouseInvName}
    VALUES (${invitations.map(() => `${householdId}, ${currentId}, ?, ?, NOW()`).join('),(')})
  `, invitations.flatMap(user => [user.id, user.invitationMessage || '']))

export const createHousehold = async (
  data: Record<string, string | number>,
  currentId: number
): Promise<number | null> =>
  database.withTransaction(async (): Promise<number | null> => {
    const result = await database.query(`
      INSERT INTO ${tHouseholdsName} (
        ${tHouseholdsCols.name}, ${tHouseholdsCols.photo}, ${tHouseholdsCols.date_created}
      ) VALUES (?, ?, NOW())
    `, [data[HOUSEHOLD_KEYS.NAME], data[HOUSEHOLD_KEYS.PHOTO]])

    if (!result?.insertId) {
      return null
    }
    const success = await database.query(`
      INSERT INTO ${tHouseMemName}
      VALUES (${result.insertId}, ${currentId}, ${currentId}, '${HOUSEHOLD_ROLE_TYPE.ADMIN}', ?, ?, NOW())
    `, [data[HOUSEHOLD_KEYS.USER_NAME], data[HOUSEHOLD_KEYS.USER_PHOTO]])
    return success && result.insertId
  })

export const editHousehold = async (
  householdId: number,
  data: Record<string, any>,
  currentId: number
): Promise<boolean | null> =>
  database.withTransaction(async (): Promise<boolean> => {
    const {
      [HOUSEHOLD_KEYS.PHOTO]: photo,
      [HOUSEHOLD_KEYS.NAME]: name,
      [HOUSEHOLD_KEYS.USER_NAME]: userName,
      [HOUSEHOLD_KEYS.USER_PHOTO]: userPhoto,
      [HOUSEHOLD_KEYS.USER_ROLE]: userRole,
      [HOUSEHOLD_KEYS.INVITED_CONNECTIONS]: newInvitations,
      [HOUSEHOLD_KEYS.CHANGED_ROLES]: changedRoles,
      [HOUSEHOLD_KEYS.REMOVED_MEMBERS]: removedMembers,
      [HOUSEHOLD_KEYS.REMOVED_INVITATIONS]: removedInvitations,
    } = data

    /* eslint-disable indent */
    return (!removedInvitations?.length
        || await database.query(`
          DELETE FROM ${tHouseInvName}
          WHERE ${tHouseInvCols.id_to} IN (?) AND ${tHouseInvCols.id_household}=?
        `, [removedInvitations, householdId]))
      // todo: These added invitations do not support invitation messages -> will have to be rewritten to smth. like changedRoles
      && (!newInvitations?.length
        || await database.query(`
          INSERT INTO ${tHouseInvName}
          VALUES (${newInvitations.map(() => `${householdId}, ${currentId}, ?, ?, NOW()`).join('),(')})
        `, newInvitations.flatMap((id: number) => [id, ''])))
      && (!removedMembers?.length
        || await database.query(`
          DELETE FROM ${tHouseMemName}
          WHERE ${tHouseMemCols.id_user} IN (?) AND ${tHouseMemCols.id_household}=?
        `, [removedMembers, householdId]))
      && (!changedRoles?.length
        || await database.query(`
          INSERT INTO ${tHouseMemName}
            (${tHouseMemCols.id_household}, ${tHouseMemCols.id_user}, ${tHouseMemCols.id_from}, ${tHouseMemCols.role},
            ${tHouseMemCols.date_joined})
          VALUES (${changedRoles.map(() => '?, ?, ?, ?, NOW()').join('),(')})
          ON DUPLICATE KEY UPDATE
            ${tHouseMemCols.role}=VALUES(${tHouseMemCols.role})
        `, changedRoles.flatMap(({ id, role }: { id: number; role: string }) => [householdId, id, currentId, role])))
      && (!userName && !userPhoto && !userRole
        || await database.query(`
          UPDATE ${tHouseMemName} SET ${
            [
              userName && `${tHouseMemCols.name}=?`,
              userPhoto && `${tHouseMemCols.photo}=?`,
              userRole && `${tHouseMemCols.role}=?`,
            ].filter(Boolean).join(',')
          } WHERE ${tHouseMemCols.id_user}=${currentId} AND ${tHouseMemCols.id_household}=?
        `, [userName, userPhoto, userRole, householdId].filter(Boolean)))
      && (!name && !photo
        || database.query(`
          UPDATE ${tHouseholdsName} SET ${
            [
              name && `${tHouseholdsCols.name}=?`,
              photo && `${tHouseholdsCols.photo}=?`,
            ].filter(Boolean).join(',')
          } WHERE ${tHouseholdsCols.id}=?
        `, [name, photo, householdId].filter(Boolean)))
    /* eslint-enable indent */
  })

export const deleteHousehold = async (householdId: number): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tHouseholdsName}
    WHERE ${tHouseholdsCols.id}=?
  `, [householdId])

export const findHouseholdAdmins = async (householdId: number): Promise<number[]> => {
  const admins = await database.query(`
    SELECT ${tHouseMemCols.id_user}
    FROM ${tHouseMemName}
    WHERE  ${tHouseMemCols.id_household}=? AND ${tHouseMemCols.role}='${HOUSEHOLD_ROLE_TYPE.ADMIN}'
  `, [householdId])
  return admins?.map((admin: any) => admin[tHouseMemCols.id_user])
}

export const leaveHousehold = async (
  userId: number,
  householdId: number
): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.id_household}=? AND ${tHouseMemCols.id_user}=${userId}
  `, [householdId])

export const deleteInvitation = async (
  currentId: number,
  fromId: number,
  householdId: number,
): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tHouseInvName}
    WHERE ${tHouseInvCols.id_to}=${currentId} AND ${tHouseInvCols.id_from}=? AND ${tHouseInvCols.id_household}=?
  `, [fromId, householdId])

export const approveInvitation = async (
  currentId: number,
  fromId: number,
  householdId: number,
  name: string,
  photo: string,
): Promise<boolean | null> =>
  database.withTransaction(async (): Promise<boolean> => {
    const deleted = await deleteInvitation(currentId, fromId, householdId)
    return deleted && database.query(`
      INSERT INTO ${tHouseMemName} (
        ${tHouseMemCols.id_household}, ${tHouseMemCols.id_user}, ${tHouseMemCols.id_from}, ${tHouseMemCols.role},
        ${tHouseMemCols.name}, ${tHouseMemCols.photo}, ${tHouseMemCols.date_joined}
      ) VALUES (?, ${currentId}, ?, '${HOUSEHOLD_ROLE_TYPE.MEMBER}', ?, ?, NOW())
    `, [householdId, fromId, name, photo])
  })

export const getUserRole = async (
  userId: number,
  householdId: number
): Promise<string | null> => {
  const role = await database.query(`
    SELECT ${tHouseMemCols.role}
    FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.id_user}=${userId} AND ${tHouseMemCols.id_household}=?
    LIMIT 1
  `, [householdId])
  return role?.[0][tHouseMemCols.role]
}

export const getHouseholdMembers = async (
  householdId: number
): Promise<Array<{ id: number; role: string }> | null> => {
  const members = await database.query(`
    SELECT * FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.id_household}=?
  `, [householdId])
  return members?.map((member: any) => ({ id: member[tHouseMemCols.id_user], role: member[tHouseMemCols.role] }))
}
