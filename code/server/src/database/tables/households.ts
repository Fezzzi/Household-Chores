export const tHouseholdsName = 'households'
export const tHouseholdsCols = {
  household_id: 'household_id',
  name: 'name',
  photo: 'photo',
  date_created: 'date_created',
} as const

export type THouseholdsType = {
  [tHouseholdsCols.household_id]: number
  [tHouseholdsCols.name]: string
  [tHouseholdsCols.photo]: string | null
  [tHouseholdsCols.date_created]: Date
}
