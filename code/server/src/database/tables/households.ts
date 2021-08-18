export const tHouseholdsName = 'households'
export const tHouseholdsCols = {
  id: 'id',
  name: 'name',
  photo: 'photo',
  date_created: 'date_created',
} as const

export type THouseholdsType = {
  [tHouseholdsCols.id]: number
  [tHouseholdsCols.name]: string
  [tHouseholdsCols.photo]: string | null
  [tHouseholdsCols.date_created]: Date
}
