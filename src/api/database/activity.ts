import { DEFAULT_FEED_PAGE_SIZE } from 'shared/constants'
import { MAX_FEED_PAGE_SIZE } from 'api/constants'

import { database } from './database'
import { tActivityName, tActivityCols, TActivityType } from './tables'
import { mapToUserActivityApiType } from './mappers'

export const getActivityForUser = async (userId: number, page: number, pageSize?: number) => {
  const validPageSize = Math.max(1, Math.min(pageSize ?? DEFAULT_FEED_PAGE_SIZE, MAX_FEED_PAGE_SIZE))
  const offset = (Math.max(page, 1) - 1) * validPageSize

  const result = await database.query<Omit<TActivityType, typeof tActivityCols.user_id>>(`
    SELECT ${Object.values(tActivityCols).filter(key => key !== tActivityCols.user_id).join(', ')}
    FROM ${tActivityName}
    WHERE ${tActivityCols.user_id}=${userId} AND ${tActivityCols.date_created} > NOW() - interval '2 months'
    ORDER BY ${tActivityCols.date_created} DESC
    LIMIT ${validPageSize}
    OFFSET ${offset}
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
  userIds: number[],
  message: string,
  messageTexts: string[],
  messagePhotos: string[],
  link: string | null = null
) =>
  database.queryBool(`
    INSERT INTO ${tActivityName} (
      ${tActivityCols.user_id}, ${tActivityCols.message}, ${tActivityCols.message_texts},
      ${tActivityCols.message_photos}, ${tActivityCols.link}, ${tActivityCols.date_created}
    ) VALUES (
      ${userIds.map((id, index) => `
        ${id}, $${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4}, NOW()
      `).join('),(')}
    )
  `, userIds.flatMap(() => [message, messageTexts, messagePhotos, link]))
