import { database } from 'serverSrc/database'

import { tActivityName, tActivityCols } from './tables'

export const getActivityForUser = async (userId: number): Promise<Array<object> | null> =>
  database.withTransaction(async (): Promise<Array<object>> => {
    const result = await database.query(`
      SELECT ${tActivityCols.id}, ${tActivityCols.message}, ${tActivityCols.link},
        ${tActivityCols.seen}, ${tActivityCols.date_created}
      FROM ${tActivityName}
      WHERE ${tActivityCols.id_user}=${userId}
    `)

    if (!result || result.length === 0) {
      return []
    }

    const activityIds = result.map(({ id }: { id: number }) => id)
    database.query(`
      UPDATE ${tActivityName} SET ${tActivityCols.seen}=1 WHERE ${tActivityCols.id} IN (${activityIds.join(',')})
    `)
    return result
  })

// There is no real need to escape message and link as they are constructed on BE but one can never be careful too much
export const addActivityForUsers = async (
  userIds: Array<number>,
  message: string,
  link: string
): Promise<boolean> =>
  database.query(`
    INSERT INTO ${tActivityName} (
      ${tActivityCols.id_user}, ${tActivityCols.message}, ${tActivityCols.link}, ${tActivityCols.date_created}
    ) VALUES (${userIds.map(id => `${id}, ?, ?, NOW()`).join('),(')})
  `, userIds.flatMap(() => [message, link]))
