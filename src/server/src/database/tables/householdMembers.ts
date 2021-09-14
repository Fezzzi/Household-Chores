import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'

export const tHouseMemName = 'household_members'
export const tHouseMemCols = {
  household_id: 'household_id',
  user_id: 'user_id',
  from_id: 'from_id',
  role: 'role',
  nickname: 'nickname',
  photo: 'photo',
  date_joined: 'date_joined',
} as const

export type THouseMemType = {
  [tHouseMemCols.household_id]: number
  [tHouseMemCols.user_id]: number
  [tHouseMemCols.from_id]: number
  [tHouseMemCols.role]: typeof HOUSEHOLD_ROLE_TYPE.MEMBER | typeof HOUSEHOLD_ROLE_TYPE.MANAGER | typeof HOUSEHOLD_ROLE_TYPE.ADMIN
  [tHouseMemCols.nickname]: string
  [tHouseMemCols.photo]: string
  [tHouseMemCols.date_joined]: Date
}
