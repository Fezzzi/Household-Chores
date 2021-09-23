import { PoolClient } from 'pg'

import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { CreateHouseholdInvitation } from 'api/actions/households/types'

import { database } from './database'
import {
  tHouseholdsCols,
  tHouseholdsName,
  tHouseInvCols,
  tHouseInvName,
  tHouseMemCols,
  tHouseMemName,
  tUsersCols,
  tUsersName,
} from './tables'
import {
  HouseholdInvitationDbType,
  HouseholdsInvitationsDbType,
  HouseholdsInvitationsMapApiType,
  mapToHouseholdInvitationApiType,
  mapToHouseholdsInvitationsApiType,
} from './mappers'

export const getUserInvitations = async (currentUser: number) => {
  const results = await database.query<HouseholdInvitationDbType>(`
    SELECT invitations.${tHouseInvCols.household_id}, invitations.${tHouseInvCols.from_id},
      invitations.${tHouseInvCols.message}, invitations.${tHouseInvCols.date_created},
      households.${tHouseholdsCols.name} AS household_name, households.${tHouseholdsCols.photo} AS household_photo,
      members.${tHouseMemCols.nickname} AS from_nickname, members.${tHouseMemCols.photo} AS from_photo
    FROM ${tHouseInvName} AS invitations
    INNER JOIN ${tHouseholdsName} AS households ON invitations.${tHouseInvCols.household_id} = households.${tHouseholdsCols.household_id}
    LEFT JOIN ${tHouseMemName} AS members ON invitations.${tHouseInvCols.from_id} = members.${tHouseMemCols.user_id}
      AND invitations.${tHouseInvCols.household_id}=members.${tHouseMemCols.household_id}
    WHERE invitations.${tHouseInvCols.to_id}=${currentUser}
  `)

  return results.map(mapToHouseholdInvitationApiType)
}

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
  database.withTransaction(async (client): Promise<boolean> => {
    const deleted = await deleteInvitation(currentId, fromId, householdId)

    return deleted && database.queryBool(`
      INSERT INTO ${tHouseMemName} (
        ${tHouseMemCols.household_id}, ${tHouseMemCols.user_id}, ${tHouseMemCols.from_id}, ${tHouseMemCols.role},
        ${tHouseMemCols.nickname}, ${tHouseMemCols.photo}, ${tHouseMemCols.date_joined}
      ) VALUES ($1, ${currentId}, $2, '${HOUSEHOLD_ROLE_TYPE.MEMBER}', $3, $4, NOW())
    `, [householdId, fromId, nickname, photo], client)
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

type HouseholdsInvitationsMap = Record<
  HouseholdsInvitationsDbType[typeof tHouseInvCols.household_id],
  HouseholdsInvitationsMapApiType[]
  >
export const getHouseholdsInvitationsMap = async (householdIds: number[], client: PoolClient | null = null) => {
  const invitations = await database.query<HouseholdsInvitationsDbType>(`
    SELECT ${tHouseInvCols.household_id}, ${tHouseInvCols.from_id}, ${tHouseInvCols.to_id},
      ${tHouseInvCols.message}, ${tHouseInvCols.date_created},
      ${tUsersCols.nickname} AS to_nickname, ${tUsersCols.photo} AS to_photo
    FROM ${tHouseInvName}
    LEFT JOIN ${tUsersName} ON ${tUsersCols.user_id}=${tHouseInvCols.to_id}
    WHERE ${tHouseInvCols.household_id} IN (${householdIds.join(', ')})
  `, [], client)

  return invitations
    .map(mapToHouseholdsInvitationsApiType)
    .reduce<HouseholdsInvitationsMap>((acc, invitation) => {
      const { householdId, ...rest } = invitation

      if (!acc[householdId]) {
        acc[householdId] = []
      }
      acc[householdId].push(rest)
      return acc
    }, {})
}

