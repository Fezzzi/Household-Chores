import { PoolClient } from 'pg'

import { database } from './database'
import { tHouseMemCols, tHouseMemName } from './tables'
import {
  HouseholdMemberDbType,
  HouseholdsMembersDbType,
  HouseholdsMembersMapApiType,
  mapToHouseholdMemberApiType,
  mapToHouseholdsMembersApiType,
} from './mappers'

export const getHouseholdMembers = async (householdId: number) => {
  const members = await database.query<HouseholdMemberDbType>(`
    SELECT ${tHouseMemCols.user_id}, ${tHouseMemCols.role}, ${tHouseMemCols.nickname}
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
    .reduce((acc, member) => {
      const { householdId, ...rest } = member

      if (!acc[householdId]) {
        acc[householdId] = []
      }
      acc[householdId].push(rest)
      return acc
    }, {} as HouseholdsMembersMap)
}
