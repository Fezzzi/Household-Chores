import { database } from './database'
import { tActivityName, tActivityCols, TActivityType } from './tables'
import { mapToUserActivityApiType } from './mappers'

export const getActivityForUser = async (userId: number) => {
  const result = await database.query<Omit<TActivityType, typeof tActivityCols.user_id>>(`
    SELECT
      ${tActivityCols.id}, ${tActivityCols.message}, ${tActivityCols.link},
      ${tActivityCols.date_created}, ${tActivityCols.date_seen}
    FROM ${tActivityName}
    WHERE ${tActivityCols.user_id}=${userId}
    ORDER BY ${tActivityCols.date_seen} IS NULL DESC, ${tActivityCols.date_created} DESC
    LIMIT 25
  `)

  return result.map(mapToUserActivityApiType)
}

export const markActivityForUser = (activityIds: number[]) =>
  database.queryBool(`
    UPDATE ${tActivityName}
    SET ${tActivityCols.date_seen}=NOW()
    WHERE ${tActivityCols.id} IN (${activityIds.join(',')})
  `)

// There is no real need to escape message and link as they are constructed on BE but one can never be careful too much
export const addActivityForUsers = (
  userIds: Array<number>,
  message: string,
  link: string | null = null
) =>
  database.queryBool(`
    INSERT INTO ${tActivityName} (
      ${tActivityCols.user_id}, ${tActivityCols.message}, ${tActivityCols.link}, ${tActivityCols.date_created}
    ) VALUES (
      ${userIds.map((id, index) => `${id}, $${index * 2 + 1}, $${index * 2 + 2}, NOW()`).join('),(')}
    )
  `, userIds.flatMap(() => [message, link]))
