import { database } from 'serverSrc/database'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { apify } from 'serverSrc/helpers/api'
import { CreateHouseholdInvitation } from 'serverSrc/actions/households/types'

import {
  tHouseholdsName, tHouseholdsCols, tHouseInvName, tHouseInvCols,
  tHouseMemName, tHouseMemCols, tUsersName, tUsersCols,
} from './tables'

export const findUserInvitations = async (currentUser: number): Promise<Array<object>> =>
  apify(database.query(`
    SELECT i.${tHouseInvCols.id_household}, h.${tHouseholdsCols.name} as household_name,
      h.${tHouseholdsCols.photo} as household_photo,
      i.${tHouseInvCols.id_from}, u.${tUsersCols.nickname} as from_nickname, u.${tUsersCols.photo} AS from_photo,
      i.${tHouseInvCols.message}, i.${tHouseInvCols.date_created}
    FROM ${tHouseInvName} AS i
    INNER JOIN ${tHouseholdsName} AS h ON ${tHouseInvCols.id_household} = h.${tHouseholdsCols.id}
    LEFT JOIN ${tUsersName} AS u ON ${tHouseInvCols.id_from} = u.${tUsersCols.id}
    WHERE ${tHouseInvCols.id_to}=${currentUser}
  `))

export const getUserHouseholdsData = async (currentUser: number): Promise<Array<object>> => {
  const households = await database.query(`
    SELECT households.${tHouseholdsCols.id}, households.${tHouseholdsCols.name} AS h_name,
      households.${tHouseholdsCols.photo} AS h_photo, CONCAT('household-', households.${tHouseholdsCols.id}) AS "key",
      households.${tHouseholdsCols.date_created}, members.${tHouseMemCols.role},
      members.${tHouseMemCols.id_user}, members.${tHouseMemCols.nickname}, members.${tHouseMemCols.photo}
    FROM ${tHouseholdsName} AS households
    INNER JOIN ${tHouseMemName} AS mems
      ON households.${tHouseholdsCols.id}=mems.${tHouseMemCols.id_household} AND mems.${tHouseMemCols.id_user}=${currentUser}
    LEFT JOIN ${tHouseMemName} AS members ON households.${tHouseholdsCols.id}=members.${tHouseInvCols.id_household}
  `)

  return Object.values(households.reduce((acc: any, household: any) => {
    const householdId = household[tHouseholdsCols.id]
    if (acc[householdId] === undefined) {
      acc[householdId] = {
        householdId: household[tHouseholdsCols.id],
        name: household.h_name,
        photo: household.h_photo,
        key: household.key,
        dateCreated: household[tHouseholdsCols.date_created],
        members: [],
      }
    }
    if (household[tHouseMemCols.id_user] && !acc[householdId].members.find((member: any) =>
      member.userId === household[tHouseMemCols.id_user])
    ) {
      acc[householdId].members.push({
        userId: household[tHouseMemCols.id_user],
        role: household[tHouseMemCols.role],
        nickname: household[tHouseMemCols.nickname],
        photo: household[tHouseMemCols.photo],
      })
    }
    return acc
  }, {}))
}

export const findUserHouseholds = async (currentUser: number): Promise<Array<object>> => {
  const households = await database.query(`
    SELECT households.${tHouseholdsCols.id}, households.${tHouseholdsCols.name} AS h_name,
      households.${tHouseholdsCols.photo} AS h_photo, CONCAT('household-', households.${tHouseholdsCols.id}) AS "key",
      households.${tHouseholdsCols.date_created} AS h_created,
      invitations.${tHouseInvCols.id_from}, invitations.${tHouseInvCols.id_to}, invitations.${tHouseInvCols.message},
      invitations.${tHouseInvCols.date_created}, users.${tUsersCols.nickname}, users.${tUsersCols.photo} AS u_photo,
      members.${tHouseMemCols.role}, members.${tHouseMemCols.id_user}, members.${tHouseMemCols.date_joined},
      members.${tHouseMemCols.nickname}, members.${tHouseMemCols.photo}
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
        householdId: household[tHouseholdsCols.id],
        name: household.h_name,
        photo: household.h_photo,
        key: household.key,
        dateCreated: household.h_created,
        members: [],
        invitations: [],
      }
    }
    if (household[tHouseInvCols.id_to] && household[tHouseInvCols.id_from]
      && !acc[householdId].invitations.find((invitation: any) =>
        invitation.toId === household[tHouseInvCols.id_to])
    ) {
      acc[householdId].invitations.push({
        fromId: household[tHouseInvCols.id_from],
        toId: household[tHouseInvCols.id_to],
        toNickname: household[tUsersCols.nickname],
        toPhoto: household.u_photo,
        message: household[tHouseInvCols.message],
        dateCreated: household[tHouseInvCols.date_created],
      })
    }
    if (household[tHouseMemCols.id_user] && !acc[householdId].members.find((member: any) =>
      member.userId === household[tHouseMemCols.id_user])
    ) {
      acc[householdId].members.push({
        userId: household[tHouseMemCols.id_user],
        role: household[tHouseMemCols.role],
        nickname: household[tHouseMemCols.nickname],
        photo: household[tHouseMemCols.photo],
        dateJoined: household[tHouseMemCols.date_joined],
      })
    }
    return acc
  }, {}))
}

export const addHouseholdInvitations = async (
  householdId: number,
  invitations: CreateHouseholdInvitation[],
  currentId: number,
): Promise<boolean> =>
  database.query(`
    INSERT INTO ${tHouseInvName}
    VALUES (${invitations.map(() => `${householdId}, ${currentId}, ?, ?, NOW()`).join('),(')})
  `, invitations.flatMap(user => [user.toId, user.message || '']))

export const createHousehold = async (
  data: Record<string, string | number>,
  currentId: number
): Promise<number | null> =>
  database.withTransaction(async (): Promise<number | null> => {
    const result = await database.query(`
      INSERT INTO ${tHouseholdsName} (
        ${tHouseholdsCols.name}, ${tHouseholdsCols.photo}, ${tHouseholdsCols.date_created}
      ) VALUES (?, ?, NOW())
    `, [data.name, data.photo])

    if (!result?.insertId) {
      return null
    }
    const success = await database.query(`
      INSERT INTO ${tHouseMemName}
      VALUES (${result.insertId}, ${currentId}, ${currentId}, '${HOUSEHOLD_ROLE_TYPE.ADMIN}', ?, ?, NOW())
    `, [data.userNickname, data.userPhoto])
    return success && result.insertId
  })

export const editHousehold = async (
  householdId: number,
  data: Record<string, any>,
  currentId: number
): Promise<boolean | null> =>
  database.withTransaction(async (): Promise<boolean> => {
    const {
      photo,
      name,
      userNickname,
      userPhoto,
      userRole,
      newInvitations,
      changedRoles,
      removedMembers,
      removedInvitations,
    } = data

    /* eslint-disable indent */
    return (!removedInvitations?.length
        || await database.query(`
          DELETE FROM ${tHouseInvName}
          WHERE ${tHouseInvCols.id_to} IN (?) AND ${tHouseInvCols.id_household}=?
        `, [removedInvitations, householdId]))
      && (!newInvitations?.length
        || await database.query(`
          INSERT INTO ${tHouseInvName}
          VALUES (${newInvitations.map(() => `${householdId}, ${currentId}, ?, ?, NOW()`).join('),(')})
        `, newInvitations.flatMap((user: Record<string, number | string>) => [user.userId, user.message || ''])))
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
        `, changedRoles.flatMap(({ userId, role }: { userId: number; role: string }) => [householdId, userId, currentId, role])))
      && (!userNickname && !userPhoto && !userRole
        || await database.query(`
          UPDATE ${tHouseMemName} SET ${
            [
              userNickname && `${tHouseMemCols.nickname}=?`,
              userPhoto && `${tHouseMemCols.photo}=?`,
              userRole && `${tHouseMemCols.role}=?`,
            ].filter(Boolean).join(',')
          } WHERE ${tHouseMemCols.id_user}=${currentId} AND ${tHouseMemCols.id_household}=?
        `, [userNickname, userPhoto, userRole, householdId].filter(Boolean)))
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
  nickname: string,
  photo: string,
): Promise<boolean | null> =>
  database.withTransaction(async (): Promise<boolean> => {
    const deleted = await deleteInvitation(currentId, fromId, householdId)
    return deleted && database.query(`
      INSERT INTO ${tHouseMemName} (
        ${tHouseMemCols.id_household}, ${tHouseMemCols.id_user}, ${tHouseMemCols.id_from}, ${tHouseMemCols.role},
        ${tHouseMemCols.nickname}, ${tHouseMemCols.photo}, ${tHouseMemCols.date_joined}
      ) VALUES (?, ${currentId}, ?, '${HOUSEHOLD_ROLE_TYPE.MEMBER}', ?, ?, NOW())
    `, [householdId, fromId, nickname, photo])
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
): Promise<Array<{ userId: number; role: string; nickname: string }> | null> => {
  const members = await database.query(`
    SELECT * FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.id_household}=?
  `, [householdId])

  return members?.map((member: any) => ({
    userId: member[tHouseMemCols.id_user],
    role: member[tHouseMemCols.role],
    nickname: member[tHouseMemCols.nickname],
  }))
}

export const getHouseholdName = async (householdId: number): Promise<string> => {
  const householdNames = await database.query(`
    SELECT ${tHouseholdsCols.name} FROM ${tHouseholdsName}
    WHERE ${tHouseholdsCols.id}=?
    LIMIT 1
  `, [householdId])

  return householdNames[0][tHouseholdsCols.name]
}
