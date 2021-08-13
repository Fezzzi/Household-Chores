import { CONNECTION_STATE_TYPE } from 'shared/constants'

import { database } from './database'
import { tConnectionsName, tConnectionsCols, tUsersName, tUsersCols, TConnectionsType } from './tables'
import { fMutualConnectionsName, fMutualConnectionsOut } from './functions'
import {
  ApprovedConnectionDbType,
  ConnectionApiType,
  ConnectionDbType,
  mapToApprovedConnectionApiType,
  mapToConnectionApiType,
} from './mappers'
import { getUserFriendIds } from './users'

export const findBlockedConnectionIds = async (userId: number) => {
  const blockedIds = await database.query<Pick<TConnectionsType, typeof tConnectionsCols.from_id>>(`
    SELECT ${tConnectionsCols.from_id} FROM ${tConnectionsName}
    WHERE ${tConnectionsCols.to_id}=${userId} AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.BLOCKED}'
  `)

  return blockedIds.map(({ [tConnectionsCols.from_id]: id }) => id)
}

export const findApprovedConnections = async (userId: number) => {
  const connections = await database.query<ApprovedConnectionDbType>(`
    SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.photo}, ${tConnectionsCols.date_created}
    FROM ${tConnectionsName}
    INNER JOIN ${tUsersName}
      ON (${tUsersCols.id}=${tConnectionsCols.from_id} AND ${tConnectionsCols.to_id}=${userId})
        OR (${tUsersCols.id}=${tConnectionsCols.to_id} AND ${tConnectionsCols.from_id}=${userId})
    WHERE (${tConnectionsCols.to_id}=${userId}
      OR ${tConnectionsCols.from_id}=${userId})
      AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
  `)

  return connections.map(mapToApprovedConnectionApiType)
}

// todo: Replace with { [key in ...]: ConnectionApiType[] } once all is in typeScript
type GroupedConnectionsType = {
  [CONNECTION_STATE_TYPE.APPROVED]: ConnectionApiType[]
  [CONNECTION_STATE_TYPE.BLOCKED]: ConnectionApiType[]
  [CONNECTION_STATE_TYPE.WAITING]: ConnectionApiType[]
}

export const findConnections = (userId: number): Promise<GroupedConnectionsType> =>
  database.withTransaction(async (): Promise<GroupedConnectionsType> => {
    const friendIds = await getUserFriendIds(userId)

    const approvedFromConnections = await database.query<ConnectionDbType>(`
      SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.photo}, ${tConnectionsCols.message},
        ${tConnectionsCols.state}, ${tConnectionsCols.date_created}, ${fMutualConnectionsOut.mutual_connections}
      FROM ${tUsersName}
      INNER JOIN ${tConnectionsName} ON ${tUsersCols.id}=${tConnectionsCols.to_id}
      LEFT JOIN ${fMutualConnectionsName}('{${friendIds}}')
        ON ${fMutualConnectionsOut.target_user_id}=${tUsersCols.id}
      WHERE ${tConnectionsCols.from_id}=${userId} AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
    `)

    const otherConnections = await database.query<ConnectionDbType>(`
      SELECT ${tUsersCols.id}, ${tUsersCols.nickname}, ${tUsersCols.photo},
        ${tConnectionsCols.message}, ${tConnectionsCols.state}, ${tConnectionsCols.date_created},
        ${fMutualConnectionsOut.mutual_connections}
      FROM ${tUsersName}
      INNER JOIN ${tConnectionsName} ON ${tUsersCols.id}=${tConnectionsCols.from_id}
      LEFT JOIN ${fMutualConnectionsName}('{${friendIds}}')
        ON ${fMutualConnectionsOut.target_user_id}=${tUsersCols.id}
      WHERE ${tConnectionsCols.to_id}=${userId}
    `)

    return [...approvedFromConnections, ...otherConnections]
      .map(mapToConnectionApiType)
      .reduce((acc, connection) => {
        if (acc[connection[tConnectionsCols.state]]) {
          acc[connection[tConnectionsCols.state]].push(connection)
        } else {
          acc[connection[tConnectionsCols.state]] = [connection]
        }

        return acc
      }, {} as GroupedConnectionsType)
  })

export const approveConnection = (currentId: number, userId: number) =>
  database.queryBool(`
    UPDATE ${tConnectionsName}
    SET ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}', ${tConnectionsCols.date_created}=NOW() 
    WHERE ${tConnectionsCols.from_id}=$1 AND ${tConnectionsCols.to_id}=${currentId}
  `, [userId])

export const createConnectionRequest = (currentId: number, userId: number, message: string | null) =>
  database.queryBool(`
    INSERT INTO ${tConnectionsName} (
      ${tConnectionsCols.from_id}, ${tConnectionsCols.to_id}, ${tConnectionsCols.message},
      ${tConnectionsCols.state}, ${tConnectionsCols.date_created}
    ) VALUES (
      ${currentId}, $1, $2, '${CONNECTION_STATE_TYPE.WAITING}', NOW()
    )
  `, [userId, message])

export const removeConnection = (currentId: number, userId: number) =>
  database.queryBool(`
    DELETE FROM ${tConnectionsName}
    WHERE (${tConnectionsCols.from_id}=$1 AND ${tConnectionsCols.to_id}=${currentId})
      OR (${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
      AND ${tConnectionsCols.from_id}=${currentId} AND ${tConnectionsCols.to_id}=$1)
  `, [userId])

export const blockConnection = (currentId: number, userId: number) =>
  database.queryBool(`
    UPDATE ${tConnectionsName}
    SET ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.BLOCKED}', ${tConnectionsCols.date_created}=NOW(),
      ${tConnectionsCols.from_id}=$1, ${tConnectionsCols.to_id}=${currentId}
    WHERE (${tConnectionsCols.from_id}=$1 AND ${tConnectionsCols.to_id}=${currentId})
      OR (${tConnectionsCols.from_id}=${currentId} AND ${tConnectionsCols.to_id}=$1
      AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}')
  `, [userId])
