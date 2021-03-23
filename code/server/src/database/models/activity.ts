import { database } from 'serverSrc/database'
import { apify } from 'serverSrc/helpers/api'

import { tActivityName, tActivityCols } from './tables'

export const getActivityForUser = async (userId: number): Promise<Array<object> | null> =>
  apify(database.query(`
    SELECT
      ${tActivityCols.id}, ${tActivityCols.message}, ${tActivityCols.link},
      ${tActivityCols.date_created}, ${tActivityCols.date_seen}
    FROM ${tActivityName}
    WHERE ${tActivityCols.id_user}=${userId}
    ORDER BY ${tActivityCols.date_seen} IS NULL DESC, ${tActivityCols.date_created} DESC
    LIMIT 25
  `))

export const markActivityForUser = async (activityIds: number[]) =>
  database.query(`
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
  database.query(`
    INSERT INTO ${tActivityName} (
      ${tActivityCols.id_user}, ${tActivityCols.message}, ${tActivityCols.link}, ${tActivityCols.date_created}
    ) VALUES (${userIds.map(id => `${id}, ?, ?, NOW()`).join('),(')})
  `, userIds.flatMap(() => [message, link]))
