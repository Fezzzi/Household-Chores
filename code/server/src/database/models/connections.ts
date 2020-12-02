import { database } from 'serverSrc/database'
import { CONNECTION_STATE_TYPE } from 'shared/constants'

import { tConnectionsName, tConnectionsCols } from './tables'
import USERS_TABLE from './tables/users'

const { name: tUsersName, columns: tUserCols } = USERS_TABLE

export const findBlockedConnections = async (userId: number): Promise<Array<number>> =>
  database.query(`
    SELECT ${tConnectionsCols.id_from} FROM ${tConnectionsName}
    WHERE ${tConnectionsCols.id_to}=${userId} AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.BLOCKED}'
  `)

export const findApprovedConnections = async (userId: number): Promise<Array<Record<string, string | number>>> =>
  database.query(`
    SELECT users.${tUserCols.id}, users.${tUserCols.nickname}, users.${tUserCols.photo}, ${tConnectionsCols.date_created}
    FROM ${tConnectionsName}
    INNER JOIN ${tUsersName} AS users
      ON (users.${tUserCols.id}=${tConnectionsCols.id_from} AND ${tConnectionsCols.id_to}=${userId})
        OR (users.${tUserCols.id}=${tConnectionsCols.id_to} AND ${tConnectionsCols.id_from}=${userId})
    WHERE (${tConnectionsCols.id_to}=${userId}
      OR ${tConnectionsCols.id_from}=${userId})
      AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
  `)

type ConnectionsType = {
  [CONNECTION_STATE_TYPE.APPROVED]: Array<object>;
  [CONNECTION_STATE_TYPE.BLOCKED]: Array<object>;
  [CONNECTION_STATE_TYPE.WAITING]: Array<object>;
}
export const findConnections = async (userId: number): Promise<ConnectionsType | null> =>
  database.withTransaction(async (): Promise<ConnectionsType> => {
    const approvedFromConnections = await database.query(`
    SELECT ${tUserCols.id}, ${tUserCols.nickname}, ${tUserCols.photo}, ${tConnectionsCols.message},
      ${tConnectionsCols.state}, ${tConnectionsCols.date_created}
    FROM ${tConnectionsName}
    JOIN ${tUsersName} ON ${tUserCols.id}=${tConnectionsCols.id_to}
    WHERE ${tConnectionsCols.id_from}=${userId} AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
  `)

    const otherConnections = await database.query(`
    SELECT ${tUserCols.id}, ${tUserCols.nickname}, ${tUserCols.photo}, ${tConnectionsCols.message},
      ${tConnectionsCols.state}, ${tConnectionsCols.date_created}
    FROM ${tConnectionsName}
    JOIN ${tUsersName} ON ${tUserCols.id}=${tConnectionsCols.id_from}
    WHERE ${tConnectionsCols.id_to}=${userId}
  `)

    const connections = [...approvedFromConnections, ...otherConnections]

    const groupedConnections = {
      [CONNECTION_STATE_TYPE.APPROVED]: [],
      [CONNECTION_STATE_TYPE.BLOCKED]: [],
      [CONNECTION_STATE_TYPE.WAITING]: [],
    }

    return connections.length
      ? connections.reduce((acc: any, connection: any) =>
        acc[connection[tConnectionsCols.state]].push(connection) && acc, groupedConnections
      ) : groupedConnections
  })

export const approveConnection = async (currentId: number, targetId: number): Promise<boolean> =>
  database.query(`
    UPDATE ${tConnectionsName}
    SET ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}', ${tConnectionsCols.date_created}=NOW() 
    WHERE ${tConnectionsCols.id_from}=? AND ${tConnectionsCols.id_to}=${currentId}
  `, [targetId])

export const createConnection = async (
  currentId: number,
  targetId: number,
  message: string | null | undefined
): Promise<boolean> =>
  database.query(`
    INSERT INTO ${tConnectionsName} (
      ${tConnectionsCols.id_from}, ${tConnectionsCols.id_to}, ${tConnectionsCols.message},
      ${tConnectionsCols.state}, ${tConnectionsCols.date_created}
    ) VALUES (${currentId}, ?, ${message ? '?' : 'NULL'}, '${CONNECTION_STATE_TYPE.WAITING}', NOW())
  `, [targetId, message])

export const removeConnection = async (currentId: number, targetId: number): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tConnectionsName}
    WHERE (${tConnectionsCols.id_from}=? AND ${tConnectionsCols.id_to}=${currentId})
      OR (${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
      AND ${tConnectionsCols.id_from}=${currentId} AND ${tConnectionsCols.id_to}=?)
  `, [targetId, targetId])

export const blockConnection = async (currentId: number, targetId: number): Promise<boolean> =>
  database.query(`
    UPDATE ${tConnectionsName}
    SET ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.BLOCKED}', ${tConnectionsCols.date_created}=NOW(),
      ${tConnectionsCols.id_from}=?, ${tConnectionsCols.id_to}=${currentId}
    WHERE (${tConnectionsCols.id_from}=? AND ${tConnectionsCols.id_to}=${currentId})
      OR (${tConnectionsCols.id_from}=${currentId} AND ${tConnectionsCols.id_to}=?
      AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}')
  `, [targetId, targetId, targetId])
