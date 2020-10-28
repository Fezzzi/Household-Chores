import { database } from 'serverSrc/database';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';

import CONNECTIONS_TABLE from './tables/connections';
import USERS_TABLE from './tables/users';

const {
  name: tName,
  columns: {
    id_from: tabIDFrom, id_to: tabIDTo, message: tabMessage, state: tabState, date_created: tabDateCreated,
  },
} = CONNECTIONS_TABLE;

const {
  name: tUsersName,
  columns: {
    id: tabUsersID, nickname: tabUsersNickname, photo: tabUsersPhoto,
  },
} = USERS_TABLE;

export const findBlockedConnections = async (userId: number): Promise<Array<number>> =>
  database.query(`
    SELECT ${tabIDFrom} FROM ${tName}
    WHERE ${tabIDTo}=${userId} AND ${tabState}='${CONNECTION_STATE_TYPE.BLOCKED}'
  `);

export const findApprovedConnections = async (userId: number): Promise<Array<number>> =>
  database.query(`
    SELECT users.${tabUsersID}, users.${tabUsersNickname}, users.${tabUsersPhoto}, ${tabDateCreated} FROM ${tName}
    INNER JOIN ${tUsersName} AS users
      ON (users.${tabUsersID}=${tabIDFrom} AND ${tabIDTo}=${userId}) OR (users.${tabUsersID}=${tabIDTo} AND ${tabIDFrom}=${userId})
    WHERE (${tabIDTo}=${userId} OR ${tabIDFrom}=${userId}) AND ${tabState}='${CONNECTION_STATE_TYPE.APPROVED}'
  `);

export const findConnections = async (userId: number): Promise<{
  [CONNECTION_STATE_TYPE.APPROVED]: Array<object>;
  [CONNECTION_STATE_TYPE.BLOCKED]: Array<object>;
  [CONNECTION_STATE_TYPE.WAITING]: Array<object>;
}> => {
  const approvedFromConnections = await database.query(`
    SELECT ${tabUsersID}, ${tabUsersNickname}, ${tabUsersPhoto}, ${tabMessage}, ${tabState}, ${tabDateCreated}
    FROM ${tName}
    JOIN ${tUsersName} ON ${tabUsersID}=${tabIDTo}
    WHERE ${tabIDFrom}=${userId} AND ${tabState}='${CONNECTION_STATE_TYPE.APPROVED}'
  `);

  const otherConnections = await database.query(`
    SELECT ${tabUsersID}, ${tabUsersNickname}, ${tabUsersPhoto}, ${tabMessage}, ${tabState}, ${tabDateCreated}
    FROM ${tName}
    JOIN ${tUsersName} ON ${tabUsersID}=${tabIDFrom}
    WHERE ${tabIDTo}=${userId}
  `);

  const connections = [...approvedFromConnections, ...otherConnections];

  const groupedConnections = {
    [CONNECTION_STATE_TYPE.APPROVED]: [],
    [CONNECTION_STATE_TYPE.BLOCKED]: [],
    [CONNECTION_STATE_TYPE.WAITING]: [],
  };

  return connections.length
    ? connections.reduce((acc: any, connection: any) => acc[connection[tabState]].push(connection) && acc, groupedConnections)
    : groupedConnections;
};

export const approveConnection = async (currentId: number, targetId: number): Promise<boolean> =>
  database.query(`
    UPDATE ${tName} SET ${tabState}='${CONNECTION_STATE_TYPE.APPROVED}', ${tabDateCreated}=NOW() 
    WHERE ${tabIDFrom}=? AND ${tabIDTo}=${currentId}
  `, [targetId]);

export const createConnection = async (currentId: number, targetId: number, message: string | null | undefined): Promise<boolean> =>
  database.query(`
    INSERT INTO ${tName} (${tabIDFrom}, ${tabIDTo}, ${tabMessage}, ${tabState}, ${tabDateCreated})
    VALUES (${currentId}, ?, ${message ? '?' : 'NULL'}, '${CONNECTION_STATE_TYPE.WAITING}', NOW())
  `, [targetId, message]);

export const removeConnection = async (currentId: number, targetId: number): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tName}
    WHERE (${tabIDFrom}=? AND ${tabIDTo}=${currentId})
    OR (${tabState}='${CONNECTION_STATE_TYPE.APPROVED}' AND ${tabIDFrom}=${currentId} AND ${tabIDTo}=?)
  `, [targetId, targetId]);

export const blockConnection = async (currentId: number, targetId: number): Promise<boolean> =>
  database.query(`
    UPDATE ${tName}
    SET ${tabState}='${CONNECTION_STATE_TYPE.BLOCKED}', ${tabDateCreated}=NOW(), ${tabIDFrom}=?, ${tabIDTo}=${currentId}
    WHERE (${tabIDFrom}=? AND ${tabIDTo}=${currentId})
      OR (${tabIDFrom}=${currentId} AND ${tabIDTo}=? AND ${tabState}='${CONNECTION_STATE_TYPE.APPROVED}')
  `, [targetId, targetId, targetId]);
