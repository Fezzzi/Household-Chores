export const tHouseInvName = 'household_invitations'
export const tHouseInvCols = {
  household_id: 'household_id',
  from_id: 'from_id',
  to_id: 'to_id',
  message: 'message',
  date_created: 'date_created',
} as const

export type THouseInvType = {
  [tHouseInvCols.household_id]: number
  [tHouseInvCols.from_id]: number
  [tHouseInvCols.to_id]: number
  [tHouseInvCols.message]: string | null
  [tHouseInvCols.date_created]: Date
}
