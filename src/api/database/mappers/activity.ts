import { apifyObject, SnakeCaseObjectToCamelCase } from 'api/helpers/api'

import { tActivityCols, TActivityType } from '../tables'

export type UserActivityDbType = Omit<TActivityType, typeof tActivityCols.user_id>

export type UserActivityApiType = SnakeCaseObjectToCamelCase<UserActivityDbType>

export const mapToUserActivityApiType = (activity: UserActivityDbType): UserActivityApiType =>
  apifyObject(activity)
