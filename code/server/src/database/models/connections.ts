import { database } from 'serverSrc/database'
import { CONNECTION_STATE_TYPE } from 'shared/constants'

import CONNECTIONS_TABLE from './tables/connections'
import USERS_TABLE from './tables/users'

const { name: tName, columns: tConnectionCols } = CONNECTIONS_TABLE
const { name: tUsersName, columns: tUserCols } = USERS_TABLE

export const findBlockedConnections = async (userId: number): Promise<Array<number>> =>
  database.query(`
    SELECT ${tConnectionCols.id_from} FROM ${tName}
    WHERE ${tConnectionCols.id_to}=${userId} AND ${tConnectionCols.state}='${CONNECTION_STATE_TYPE.BLOCKED}'
  `)

export const findApprovedConnections = async (userId: number): Promise<Array<Record<string, string | number>>> =>
  database.query(`
    SELECT users.${tUserCols.id}, users.${tUserCols.nickname}, users.${tUserCols.photo}, ${tConnectionCols.date_created}
    FROM ${tName}
    INNER JOIN ${tUsersName} AS users
      ON (users.${tUserCols.id}=${tConnectionCols.id_from} AND ${tConnectionCols.id_to}=${userId})
        OR (users.${tUserCols.id}=${tConnectionCols.id_to} AND ${tConnectionCols.id_from}=${userId})
    WHERE (${tConnectionCols.id_to}=${userId}
      OR ${tConnectionCols.id_from}=${userId})
      AND ${tConnectionCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
  `)

type ConnectionsType = {
  [CONNECTION_STATE_TYPE.APPROVED]: Array<object>;
  [CONNECTION_STATE_TYPE.BLOCKED]: Array<object>;
  [CONNECTION_STATE_TYPE.WAITING]: Array<object>;
}
export const findConnections = async (userId: number): Promise<ConnectionsType | null> =>
  database.withTransaction(async (): Promise<ConnectionsType> => {
    const approvedFromConnections = await database.query(`
    SELECT ${tUserCols.id}, ${tUserCols.nickname}, ${tUserCols.photo}, ${tConnectionCols.message},
      ${tConnectionCols.state}, ${tConnectionCols.date_created}
    FROM ${tName}
    JOIN ${tUsersName} ON ${tUserCols.id}=${tConnectionCols.id_to}
    WHERE ${tConnectionCols.id_from}=${userId} AND ${tConnectionCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
  `)

    const otherConnections = await database.query(`
    SELECT ${tUserCols.id}, ${tUserCols.nickname}, ${tUserCols.photo}, ${tConnectionCols.message},
      ${tConnectionCols.state}, ${tConnectionCols.date_created}
    FROM ${tName}
    JOIN ${tUsersName} ON ${tUserCols.id}=${tConnectionCols.id_from}
    WHERE ${tConnectionCols.id_to}=${userId}
  `)

    const connections = [...approvedFromConnections, ...otherConnections]

    const groupedConnections = {
      [CONNECTION_STATE_TYPE.APPROVED]: [],
      [CONNECTION_STATE_TYPE.BLOCKED]: [],
      [CONNECTION_STATE_TYPE.WAITING]: [],
    }

    return connections.length
      ? connections.reduce((acc: any, connection: any) =>
        acc[connection[tConnectionCols.state]].push(connection) && acc, groupedConnections
      ) : groupedConnections
  })

export const approveConnection = async (currentId: number, targetId: number): Promise<boolean> =>
  database.query(`
    UPDATE ${tName}
    SET ${tConnectionCols.state}='${CONNECTION_STATE_TYPE.APPROVED}', ${tConnectionCols.date_created}=NOW() 
    WHERE ${tConnectionCols.id_from}=? AND ${tConnectionCols.id_to}=${currentId}
  `, [targetId])

export const createConnection = async (currentId: number, targetId: number, message: string | null | undefined): Promise<boolean> =>
  database.query(`
    INSERT INTO ${tName} (${tConnectionCols.id_from}, ${tConnectionCols.id_to}, ${tConnectionCols.message},
      ${tConnectionCols.state}, ${tConnectionCols.date_created})
    VALUES (${currentId}, ?, ${message ? '?' : 'NULL'}, '${CONNECTION_STATE_TYPE.WAITING}', NOW())
  `, [targetId, message])

export const removeConnection = async (currentId: number, targetId: number): Promise<boolean> =>
  database.query(`
    DELETE FROM ${tName}
    WHERE (${tConnectionCols.id_from}=? AND ${tConnectionCols.id_to}=${currentId})
      OR (${tConnectionCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
      AND ${tConnectionCols.id_from}=${currentId} AND ${tConnectionCols.id_to}=?)
  `, [targetId, targetId])

export const blockConnection = async (currentId: number, targetId: number): Promise<boolean> =>
  database.query(`
    UPDATE ${tName}
    SET ${tConnectionCols.state}='${CONNECTION_STATE_TYPE.BLOCKED}', ${tConnectionCols.date_created}=NOW(),
      ${tConnectionCols.id_from}=?, ${tConnectionCols.id_to}=${currentId}
    WHERE (${tConnectionCols.id_from}=? AND ${tConnectionCols.id_to}=${currentId})
      OR (${tConnectionCols.id_from}=${currentId} AND ${tConnectionCols.id_to}=?
      AND ${tConnectionCols.state}='${CONNECTION_STATE_TYPE.APPROVED}')
  `, [targetId, targetId, targetId])
