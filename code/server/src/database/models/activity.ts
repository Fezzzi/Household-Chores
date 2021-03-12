import { database } from 'serverSrc/database'
import { apify } from 'serverSrc/helpers/api'

import { tActivityName, tActivityCols } from './tables'

export const getActivityForUser = async (userId: number): Promise<Array<object> | null> =>
  apify(database.query(`
    SELECT ${tActivityCols.id}, ${tActivityCols.message}, ${tActivityCols.link}, ${tActivityCols.date_created}
    FROM ${tActivityName}
    WHERE ${tActivityCols.id_user}=${userId} AND ${tActivityCols.seen}=0
  `))

export const markActivityForUser = async (activityIds: number[]) =>
  database.query(`
    UPDATE ${tActivityName}
    SET ${tActivityCols.seen}=1
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
