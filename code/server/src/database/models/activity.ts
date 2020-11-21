import { database } from 'serverSrc/database';

import ACTIVITY_TABLE from './tables/activity';

const { name: tName, columns } = ACTIVITY_TABLE;

export const getActivityForUser = async (userId: number): Promise<Array<object>> => {
  const result = await database.query(`
    SELECT ${columns.id}, ${columns.message}, ${columns.link}, ${columns.seen}, ${columns.date_created}
    FROM ${tName}
    WHERE ${columns.id_user}=${userId}
  `);

  if (!result) {
    return [];
  }

  const activityIds = result.map(({ id }: { id: number }) => id);
  database.query(`
    UPDATE ${tName} SET ${columns.seen}=1 WHERE ${columns.id} IN (${activityIds.join(',')})
  `);
  return result;
};

// There is no real need to escape message and link as they are constructed on BE but one can never be careful too much
export const addActivityForUsers = async (userIds: Array<number>, message: string, link: string): Promise<boolean> =>
  database.query(`
    INSERT INTO ${tName} (${columns.id_user}, ${columns.message}, ${columns.link}, ${columns.date_created})
    VALUES (${userIds.map(id => `${id}, ?, ?, NOW()`).join('),(')})
  `, userIds.flatMap(() => [message, link]));
