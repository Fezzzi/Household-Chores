import { apify } from 'serverSrc/helpers/api'

import { database } from './database'
import { tActivityName, tActivityCols, TActivityType } from './tables'

export const getActivityForUser = async (userId: number) =>
  apify(database.query<Omit<TActivityType, typeof tActivityCols.user_id>>(`
    SELECT
      ${tActivityCols.id}, ${tActivityCols.message}, ${tActivityCols.link},
      ${tActivityCols.date_created}, ${tActivityCols.date_seen}
    FROM ${tActivityName}
    WHERE ${tActivityCols.user_id}=${userId}
    ORDER BY ${tActivityCols.date_seen} IS NULL DESC, ${tActivityCols.date_created} DESC
    LIMIT 25
  `))

export const markActivityForUser = async (activityIds: number[]) =>
  database.queryBool(`
    UPDATE ${tActivityName}
    SET ${tActivityCols.date_seen}=NOW()
    WHERE ${tActivityCols.id} IN (${activityIds.join(',')})
  `)

// There is no real need to escape message and link as they are constructed on BE but one can never be careful too much
export const addActivityForUsers = async (
  userIds: Array<number>,
  message: string,
  link: string | null = null
): Promise<boolean> =>
  database.queryBool(`
    INSERT INTO ${tActivityName} (
      ${tActivityCols.user_id}, ${tActivityCols.message}, ${tActivityCols.link}, ${tActivityCols.date_created}
    ) VALUES (
      ${userIds.map((id, index) => `${id}, $${index * 2}, $${index * 2 + 1}, NOW()`).join('),(')}
    )
  `, userIds.flatMap(() => [message, link]))
