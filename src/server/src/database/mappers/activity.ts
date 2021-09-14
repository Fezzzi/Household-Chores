import { apifyObject, SnakeCaseObjectToCamelCase } from 'serverSrc/helpers/api'

import { tActivityCols, TActivityType } from '../tables'

export type UserActivityDbType = Omit<TActivityType, typeof tActivityCols.user_id>

export type UserActivityApiType = SnakeCaseObjectToCamelCase<UserActivityDbType>

export const mapToUserActivityApiType = (activity: UserActivityDbType): UserActivityApiType =>
  apifyObject(activity)
