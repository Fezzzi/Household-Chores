import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { apify, apifyObject, SnakeCaseObjectToCamelCase } from 'serverSrc/helpers/api'
import { HouseholdChangedRole, HouseholdNewInvitation } from 'serverSrc/actions/settings/types'
import { CreateHouseholdInvitation } from 'serverSrc/actions/households/types'
import { HouseholdCreationError } from 'serverSrc/helpers/errors'

import { database } from './database'
import {
  tHouseholdsName, tHouseholdsCols, tHouseInvName, tHouseInvCols,
  tHouseMemName, tHouseMemCols, tUsersName, tUsersCols,
  THouseholdsType, THouseMemType, THouseInvType,
} from './tables'
import {
  HouseholdEditMemberDbType,
  HouseholdEditUnforcedDbType,
  HouseholdMemberDbType,
  mapToHouseholdMemberApiType,
} from './mappers/households'

export const findUserInvitations = (currentUser: number) =>
  apify(database.query<
    Omit<THouseInvType, typeof tHouseInvCols.to_id>
    & {
      household_name: THouseholdsType[typeof tHouseholdsCols.name]
      household_phto: THouseholdsType[typeof tHouseholdsCols.photo]
    }
    & {
      from_nickname: THouseMemType[typeof tHouseMemCols.nickname]
      from_photo: THouseMemType[typeof tHouseMemCols.photo]
    }
  >(`
    SELECT i.${tHouseInvCols.household_id}, i.${tHouseInvCols.from_id},
      i.${tHouseInvCols.message}, i.${tHouseInvCols.date_created},
      h.${tHouseholdsCols.name} AS household_name, h.${tHouseholdsCols.photo} AS household_photo,
      m.${tHouseMemCols.nickname} AS from_nickname, m.${tHouseMemCols.photo} AS from_photo
    FROM ${tHouseInvName} AS i
    INNER JOIN ${tHouseholdsName} AS h ON ${tHouseInvCols.household_id} = h.${tHouseholdsCols.id}
    LEFT JOIN ${tHouseMemName} AS m ON ${tHouseInvCols.from_id} = m.${tHouseMemCols.user_id}
    WHERE ${tHouseInvCols.to_id}=${currentUser}
  `))

type HouseholdType = Omit<THouseholdsType, typeof tHouseholdsCols.id>
  & {
    household_id: THouseholdsType[typeof tHouseholdsCols.id]
    key: string
  }

export const getUserHouseholds = (currentUser: number) =>
  database.query<HouseholdType>(`
    SELECT households.${tHouseholdsCols.id} AS household_id, households.${tHouseholdsCols.name},
      households.${tHouseholdsCols.photo}, households.${tHouseholdsCols.date_created},
      CONCAT('household-', households.${tHouseholdsCols.id}) AS "key"
    FROM ${tHouseholdsName} AS households
    INNER JOIN ${tHouseMemName} AS mems
      ON households.${tHouseholdsCols.id}=mems.${tHouseMemCols.household_id} AND mems.${tHouseMemCols.user_id}=${currentUser}
  `)

type HouseholdMemberType = Pick<THouseMemType, typeof tHouseMemCols.household_id | typeof tHouseMemCols.user_id
  | typeof tHouseMemCols.nickname | typeof tHouseMemCols.role | typeof tHouseMemCols.date_joined>

export const getHouseholdsMembersMap = async (householdIds: number[]) => {
  const members = await database.query<HouseholdMemberType>(`
    SELECT ${tHouseMemCols.role}, ${tHouseMemCols.user_id}, ${tHouseMemCols.nickname}, ${tHouseMemCols.photo}
    FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.household_id} IN (${householdIds.join(', ')})
  `)

  return members.reduce((
    acc: Record<number, Array<SnakeCaseObjectToCamelCase<Omit<HouseholdMemberType, typeof tHouseMemCols.household_id>>>>,
    member
  ) => {
    const { [tHouseMemCols.household_id]: memberHouseholdId, ...rest } = member

    if (!acc[memberHouseholdId]) {
      acc[memberHouseholdId] = []
    }
    acc[memberHouseholdId].push(apifyObject(rest))
    return acc
  }, {})
}

export const getUserHouseholdsData = (currentUser: number) =>
  database.withTransaction(async () => {
    const households = await getUserHouseholds(currentUser)

    const householdIds = households.map(household => household.household_id)
    if (householdIds.length === 0) {
      return []
    }

    const membersMap = await getHouseholdsMembersMap(householdIds)

    return households.map(household => ({
      members: membersMap[household.household_id] ?? [],
      ...apifyObject(household),
    }))
  })

type HouseholdInvitationType = THouseInvType & {
    to_nickname: string
    to_photo: string | null
  }

export const getHouseholdInvitationsMap = async (householdIds: number[]) => {
  const invitations = await database.query<HouseholdInvitationType>(`
    SELECT invitations.${tHouseInvCols.from_id}, invitations.${tHouseInvCols.to_id},
      invitations.${tHouseInvCols.message}, invitations.${tHouseInvCols.date_created},
      users.${tUsersCols.nickname} AS to_nickname, users.${tUsersCols.photo} AS to_photo,
    FROM ${tHouseInvName} AS invitations
    WHERE ${tHouseInvCols.household_id} IN (${householdIds.join(', ')})
    LEFT JOIN ${tUsersName} AS users ON users.${tUsersCols.id}=invitations.${tHouseInvCols.to_id}
  `)

  return invitations.reduce((
    acc: Record<number, Array<SnakeCaseObjectToCamelCase<Omit<HouseholdInvitationType, typeof tHouseMemCols.household_id>>>>,
    invitation
  ) => {
    const { [tHouseMemCols.household_id]: memberHouseholdId, ...rest } = invitation

    if (!acc[memberHouseholdId]) {
      acc[memberHouseholdId] = []
    }
    acc[memberHouseholdId].push(apifyObject(rest))
    return acc
  }, {})
}

export const findUserHouseholds = (currentUser: number) =>
  database.withTransaction(async () => {
    const households = await getUserHouseholds(currentUser)

    const householdIds = households.map(household => household.household_id)
    if (householdIds.length === 0) {
      return []
    }

    const membersMap = await getHouseholdsMembersMap(householdIds)
    const invitationsMap = await getHouseholdInvitationsMap(householdIds)

    return households.map(household => ({
      members: membersMap[household.household_id] ?? [],
      invitations: invitationsMap[household.household_id] ?? [],
      ...apifyObject(household),
    }))
  })

export const addHouseholdInvitations = (
  householdId: number,
  invitations: CreateHouseholdInvitation[],
  currentId: number,
) =>
  database.queryBool(`
    INSERT INTO ${tHouseInvName}
    VALUES (${invitations.map((_, index) => `
      ${householdId}, ${currentId}, $${index * 2 + 1}, $${index * 2 + 2}, NOW()
    `).join('),(')})
  `, invitations.flatMap(user => [user.toId, user.message ?? '']))

export const createHousehold = (
  householdName: string,
  householdPhoto: string,
  userNickname: string,
  userPhoto: string,
  currentUserId: number
) =>
  database.withTransaction(async (): Promise<number> => {
    const result = await database.query<
      Pick<THouseholdsType, typeof tHouseholdsCols.id>
    >(`
      INSERT INTO ${tHouseholdsName} (
        ${tHouseholdsCols.name}, ${tHouseholdsCols.photo}, ${tHouseholdsCols.date_created}
      ) VALUES ($1, $2, NOW())
      RETURNING ${tHouseholdsCols.id}
    `, [householdName, householdPhoto])

    const newHouseholdId = result[0]?.[tHouseholdsCols.id]
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
  memberData: HouseholdEditMemberDbType,
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
            .join(',')
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
        } WHERE ${tHouseholdsCols.id}=$${householdDataEntries.length + 1}
      `, [...householdDataEntries.map(([, val]) => val), householdId])
    }
  })

export const deleteHousehold = (householdId: number) =>
  database.queryBool(`
    DELETE FROM ${tHouseholdsName}
    WHERE ${tHouseholdsCols.id}=$1
  `, [householdId])

export const findHouseholdAdminIds = async (householdId: number): Promise<number[]> => {
  const admins = await database.query<
    Pick<THouseMemType, typeof tHouseMemCols.user_id>
  >(`
    SELECT ${tHouseMemCols.user_id}
    FROM ${tHouseMemName}
    WHERE  ${tHouseMemCols.household_id}=$1 AND ${tHouseMemCols.role}='${HOUSEHOLD_ROLE_TYPE.ADMIN}'
  `, [householdId])

  return admins.map(admin => Number(admin[tHouseMemCols.user_id]))
}

export const leaveHousehold = (userId: number, householdId: number) =>
  database.queryBool(`
    DELETE FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.household_id}=$1 AND ${tHouseMemCols.user_id}=${userId}
  `, [householdId])

export const deleteInvitation = (currentId: number, fromId: number, householdId: number) =>
  database.queryBool(`
    DELETE FROM ${tHouseInvName}
    WHERE ${tHouseInvCols.to_id}=${currentId} AND ${tHouseInvCols.from_id}=$1 AND ${tHouseInvCols.household_id}=$2
  `, [fromId, householdId])

export const approveInvitation = (
  currentId: number,
  fromId: number,
  householdId: number,
  nickname: string,
  photo: string,
) =>
  database.withTransaction(async (): Promise<boolean> => {
    const deleted = await deleteInvitation(currentId, fromId, householdId)

    return deleted && database.queryBool(`
      INSERT INTO ${tHouseMemName} (
        ${tHouseMemCols.household_id}, ${tHouseMemCols.user_id}, ${tHouseMemCols.from_id}, ${tHouseMemCols.role},
        ${tHouseMemCols.nickname}, ${tHouseMemCols.photo}, ${tHouseMemCols.date_joined}
      ) VALUES ($1, ${currentId}, $2, '${HOUSEHOLD_ROLE_TYPE.MEMBER}', $3, $4, NOW())
    `, [householdId, fromId, nickname, photo])
  })

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

export const getHouseholdMembers = async (householdId: number) => {
  const members = await database.query<HouseholdMemberDbType>(`
    SELECT ${tHouseMemCols.user_id}, ${tHouseMemCols.role}, ${tHouseMemCols.nickname}
    FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.household_id}=$1
  `, [householdId])

  return members.map(mapToHouseholdMemberApiType)
}

export const getHouseholdName = async (householdId: number) => {
  const householdNames = await database.query<
    Pick<THouseholdsType, typeof tHouseholdsCols.name>
  >(`
    SELECT ${tHouseholdsCols.name}
    FROM ${tHouseholdsName}
    WHERE ${tHouseholdsCols.id}=$1
    LIMIT 1
  `, [householdId])

  return householdNames[0]
    ? String(householdNames[0][tHouseholdsCols.name])
    : null
}
