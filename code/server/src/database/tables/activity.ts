export const tActivityName = 'activity'
export const tActivityCols = {
  id: 'id',
  user_id: 'user_id',
  message: 'message',
  link: 'link',
  date_seen: 'date_seen',
  date_created: 'date_created',
} as const

export interface TActivityType {
  [tActivityCols.id]: number
  [tActivityCols.user_id]: number
  [tActivityCols.message]: string
  [tActivityCols.link]: string | null
  [tActivityCols.date_seen]: Date | null
  [tActivityCols.date_created]: Date
}
