export const tHouseholdsName = 'households'
export const tHouseholdsCols = {
  household_id: 'household_id',
  name: 'name',
  photo: 'photo',
  date_created: 'date_created',
} as const

export interface THouseholdsType {
  [tHouseholdsCols.household_id]: number
  [tHouseholdsCols.name]: string
  [tHouseholdsCols.photo]: string
  [tHouseholdsCols.date_created]: Date
}
