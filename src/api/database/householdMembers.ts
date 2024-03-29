import { PoolClient } from 'pg'

import { database } from './database'
import { tHouseMemCols, tHouseMemName, THouseMemType } from './tables'
import {
  HouseholdMemberDbType,
  HouseholdsMembersDbType,
  HouseholdsMembersMapApiType,
  mapToHouseholdMemberApiType,
  mapToHouseholdsMembersApiType,
} from './mappers'

export const getHouseholdMemberInfo = async (householdId: number, userId: number) => {
  const member = await database.query<
    Pick<THouseMemType, typeof tHouseMemCols.photo | typeof tHouseMemCols.nickname>
  >(`
    SELECT ${tHouseMemCols.nickname}, ${tHouseMemCols.photo}
    FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.household_id}=${householdId} AND ${tHouseMemCols.user_id}=${userId}
    LIMIT 1
  `)

  return member[0] ?? null
}

export const getHouseholdMembers = async (householdId: number) => {
  const members = await database.query<HouseholdMemberDbType>(`
    SELECT ${tHouseMemCols.user_id}, ${tHouseMemCols.role}, ${tHouseMemCols.nickname}, ${tHouseMemCols.photo}
    FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.household_id}=$1
  `, [householdId])

  return members.map(mapToHouseholdMemberApiType)
}

type HouseholdsMembersMap = Record<
  HouseholdsMembersDbType[typeof tHouseMemCols.household_id],
  HouseholdsMembersMapApiType[]
>
export const getHouseholdsMembersMap = async (householdIds: number[], client: PoolClient | null = null) => {
  const members = await database.query<HouseholdsMembersDbType>(`
    SELECT ${tHouseMemCols.household_id}, ${tHouseMemCols.role}, ${tHouseMemCols.user_id},
      ${tHouseMemCols.nickname}, ${tHouseMemCols.photo}
    FROM ${tHouseMemName}
    WHERE ${tHouseMemCols.household_id} IN (${householdIds.join(', ')})
  `, [], client)

  return members
    .map(mapToHouseholdsMembersApiType)
    .reduce<HouseholdsMembersMap>((acc, member) => {
      const { householdId, ...rest } = member

      if (!acc[householdId]) {
        acc[householdId] = []
      }
      acc[householdId].push(rest)
      return acc
    }, {})
}
