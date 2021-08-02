import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { apify } from 'serverSrc/helpers/api'
import { CreateHouseholdInvitation } from 'serverSrc/actions/households/types'

import { database } from './database'
import {
  tHouseholdsName, tHouseholdsCols, tHouseInvName, tHouseInvCols,
  tHouseMemName, tHouseMemCols, tUsersName, tUsersCols,
} from './tables'

export const findUserInvitations = async (currentUser: number): Promise<Array<object>> =>
  apify(database.query(`
    SELECT i.${tHouseInvCols.household_id}, h.${tHouseholdsCols.name} as household_name,
      h.${tHouseholdsCols.photo} as household_photo,
      i.${tHouseInvCols.from_id}, u.${tUsersCols.nickname} as from_nickname, u.${tUsersCols.photo} AS from_photo,
      i.${tHouseInvCols.message}, i.${tHouseInvCols.date_created}
    FROM ${tHouseInvName} AS i
    INNER JOIN ${tHouseholdsName} AS h ON ${tHouseInvCols.household_id} = h.${tHouseholdsCols.id}
    LEFT JOIN ${tUsersName} AS u ON ${tHouseInvCols.from_id} = u.${tUsersCols.id}
    WHERE ${tHouseInvCols.to_id}=${currentUser}
  `))

export const getUserHouseholdsData = async (currentUser: number): Promise<Array<object>> => {
  const households = await database.query(`
    SELECT households.${tHouseholdsCols.id}, households.${tHouseholdsCols.name} AS h_name,
      households.${tHouseholdsCols.photo} AS h_photo, CONCAT('household-', households.${tHouseholdsCols.id}) AS "key",
      households.${tHouseholdsCols.date_created}, members.${tHouseMemCols.role},
      members.${tHouseMemCols.user_id}, members.${tHouseMemCols.nickname}, members.${tHouseMemCols.photo}
    FROM ${tHouseholdsName} AS households
    INNER JOIN ${tHouseMemName} AS mems
      ON households.${tHouseholdsCols.id}=mems.${tHouseMemCols.household_id} AND mems.${tHouseMemCols.user_id}=${currentUser}
    LEFT JOIN ${tHouseMemName} AS members ON households.${tHouseholdsCols.id}=members.${tHouseInvCols.household_id}
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
    if (household[tHouseMemCols.user_id] && !acc[householdId].members.find((member: any) =>
      member.userId === household[tHouseMemCols.user_id])
    ) {
      acc[householdId].members.push({
        userId: household[tHouseMemCols.user_id],
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
      invitations.${tHouseInvCols.from_id}, invitations.${tHouseInvCols.to_id}, invitations.${tHouseInvCols.message},
      invitations.${tHouseInvCols.date_created}, users.${tUsersCols.nickname}, users.${tUsersCols.photo} AS u_photo,
      members.${tHouseMemCols.role}, members.${tHouseMemCols.user_id}, members.${tHouseMemCols.date_joined},
      members.${tHouseMemCols.nickname}, members.${tHouseMemCols.photo}
    FROM ${tHouseholdsName} AS households
    INNER JOIN ${tHouseMemName} AS mems
      ON households.${tHouseholdsCols.id}=mems.${tHouseMemCols.household_id} AND mems.${tHouseMemCols.user_id}=${currentUser}
    LEFT JOIN ${tHouseInvName} AS invitations ON households.${tHouseholdsCols.id}=invitations.${tHouseInvCols.household_id}
    LEFT JOIN ${tUsersName} AS users ON users.${tUsersCols.id}=invitations.${tHouseInvCols.to_id}
    LEFT JOIN ${tHouseMemName} AS members ON households.${tHouseholdsCols.id}=members.${tHouseInvCols.household_id}
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
    if (household[tHouseInvCols.to_id] && household[tHouseInvCols.from_id]
      && !acc[householdId].invitations.find((invitation: any) =>
        invitation.toId === household[tHouseInvCols.to_id])
    ) {
      acc[householdId].invitations.push({
        fromId: household[tHouseInvCols.from_id],
        toId: household[tHouseInvCols.to_id],
        toNickname: household[tUsersCols.nickname],
        toPhoto: household.u_photo,
        message: household[tHouseInvCols.message],
        dateCreated: household[tHouseInvCols.date_created],
      })
    }
    if (household[tHouseMemCols.user_id] && !acc[householdId].members.find((member: any) =>
      member.userId === household[tHouseMemCols.user_id])
    ) {
      acc[householdId].members.push({
        userId: household[tHouseMemCols.user_id],
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
          WHERE ${tHouseInvCols.to_id} IN (?) AND ${tHouseInvCols.household_id}=?
        `, [removedInvitations, householdId]))
      && (!newInvitations?.length
        || await database.query(`
          INSERT INTO ${tHouseInvName}
          VALUES (${newInvitations.map(() => `${householdId}, ${currentId}, ?, ?, NOW()`).join('),(')})
        `, newInvitations.flatMap((user: Record<string, number | string>) => [user.userId, user.message || ''])))
      && (!removedMembers?.length
        || await database.query(`
          DELETE FROM ${tHouseMemName}
          WHERE ${tHouseMemCols.user_id} IN (?) AND ${tHouseMemCols.household_id}=?
        `, [removedMembers, householdId]))
      && (!changedRoles?.length
        || await database.query(`
          INSERT INTO ${tHouseMemName}
            (${tHouseMemCols.household_id}, ${tHouseMemCols.user_id}, ${tHouseMemCols.from_id}, ${tHouseMemCols.role},
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
          } WHERE ${tHouseMemCols.user_id}=${currentId} AND ${tHouseMemCols.household_id}=?
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
    SELECT ${tHouseMemCols.user_id}
    FROM ${tHouseMemName}
    WHERE  ${tHouseMemCols.household_id}=? AND ${tHouseMemCols.role}='${HOUSEHOLD_ROLE_TYPE.ADMIN}'
  `, [householdId])
  return admins?.map((admin: any) => admin[tHouseMemCols.user_id])
}

export const leaveHousehold = async (
  userId: number,
  householdId: number
): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.household_id}=? AND ${tHouseMemCols.user_id}=${userId}
  `, [householdId])

export const deleteInvitation = async (
  currentId: number,
  fromId: number,
  householdId: number,
): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tHouseInvName}
    WHERE ${tHouseInvCols.to_id}=${currentId} AND ${tHouseInvCols.from_id}=? AND ${tHouseInvCols.household_id}=?
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
        ${tHouseMemCols.household_id}, ${tHouseMemCols.user_id}, ${tHouseMemCols.from_id}, ${tHouseMemCols.role},
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
    WHERE ${tHouseMemCols.user_id}=${userId} AND ${tHouseMemCols.household_id}=?
    LIMIT 1
  `, [householdId])
  return role?.[0][tHouseMemCols.role]
}

export const getHouseholdMembers = async (
  householdId: number
): Promise<Array<{ userId: number; role: string; nickname: string }> | null> => {
  const members = await database.query(`
    SELECT * FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.household_id}=?
  `, [householdId])

  return members?.map((member: any) => ({
    userId: member[tHouseMemCols.user_id],
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
