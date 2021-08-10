import { CONNECTION_STATE_TYPE } from 'shared/constants'
import { apify, apifyObject, SnakeCaseObjectToCamelCase } from 'serverSrc/helpers/api'

import { database } from './database'
import { tConnectionsName, tConnectionsCols, tUsersName, tUsersCols, TConnectionsType, TUsersType } from './tables'

export const findBlockedConnections = async (userId: number) => {
  const blockedIds = await database.query<Pick<TConnectionsType, typeof tConnectionsCols.from_id>>(`
    SELECT ${tConnectionsCols.from_id} FROM ${tConnectionsName}
    WHERE ${tConnectionsCols.to_id}=${userId} AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.BLOCKED}'
  `)

  return blockedIds.map(({ [tConnectionsCols.from_id]: id }) => id)
}

export const findApprovedConnections = (userId: number) =>
  apify(database.query<
    { user_id: number }
    & Pick<TUsersType, typeof tUsersCols.nickname | typeof tUsersCols.photo>
    & Pick<TConnectionsType, typeof tConnectionsCols.date_created>
  >(`
    SELECT users.${tUsersCols.id} as user_id, users.${tUsersCols.nickname}, users.${tUsersCols.photo},
      ${tConnectionsCols.date_created}
    FROM ${tConnectionsName}
    INNER JOIN ${tUsersName} AS users
      ON (users.${tUsersCols.id}=${tConnectionsCols.from_id} AND ${tConnectionsCols.to_id}=${userId})
        OR (users.${tUsersCols.id}=${tConnectionsCols.to_id} AND ${tConnectionsCols.from_id}=${userId})
    WHERE (${tConnectionsCols.to_id}=${userId}
      OR ${tConnectionsCols.from_id}=${userId})
      AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
  `))

type ConnectionsType = { user_id: number; mutual_connections: number }
  & Pick<TUsersType, typeof tUsersCols.nickname | typeof tUsersCols.photo>
  & Pick<TConnectionsType, typeof tConnectionsCols.message | typeof tConnectionsCols.state | typeof tConnectionsCols.date_created>

type GroupedConnectionsType = {
  [CONNECTION_STATE_TYPE.APPROVED]: SnakeCaseObjectToCamelCase<ConnectionsType>[]
  [CONNECTION_STATE_TYPE.BLOCKED]: SnakeCaseObjectToCamelCase<ConnectionsType>[]
  [CONNECTION_STATE_TYPE.WAITING]: SnakeCaseObjectToCamelCase<ConnectionsType>[]
}

export const findConnections = (userId: number): Promise<GroupedConnectionsType> =>
  database.withTransaction(async (): Promise<GroupedConnectionsType> => {
    const approvedFromConnections = await database.query<ConnectionsType>(`
      SELECT ${tUsersCols.id} as user_id, ${tUsersCols.nickname}, ${tUsersCols.photo}, ${tConnectionsCols.message},
        ${tConnectionsCols.state}, ${tConnectionsCols.date_created}, 0 AS mutual_connections
      FROM ${tConnectionsName}
      JOIN ${tUsersName} ON ${tUsersCols.id}=${tConnectionsCols.to_id}
      WHERE ${tConnectionsCols.from_id}=${userId} AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
    `)

    const otherConnections = await database.query<ConnectionsType>(`
      SELECT ${tUsersCols.id} as user_id, ${tUsersCols.nickname}, ${tUsersCols.photo},
        ${tConnectionsCols.message}, ${tConnectionsCols.state}, ${tConnectionsCols.date_created},
        (
          SELECT COUNT(*) FROM (
            SELECT * FROM (
              SELECT ${tConnectionsCols.from_id} AS uf_id FROM ${tConnectionsName}
              WHERE ${tConnectionsCols.to_id}=users.${tUsersCols.id}
                AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
              UNION
              SELECT ${tConnectionsCols.to_id} AS uf_id FROM ${tConnectionsName}
              WHERE ${tConnectionsCols.from_id}=users.${tUsersCols.id}
                AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
            ) AS userFriends INNER JOIN (
              SELECT ${tConnectionsCols.from_id} AS tf_id FROM ${tConnectionsName}
              WHERE ${tConnectionsCols.to_id}=${userId}
                AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
              UNION
              SELECT ${tConnectionsCols.to_id} AS tf_id FROM ${tConnectionsName}
              WHERE ${tConnectionsCols.from_id}=${userId}
                AND ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
            ) AS targetFriends ON userFriends.uf_id=targetFriends.tf_id
          ) AS mc
        ) AS mutual_connections
      FROM ${tConnectionsName}
      JOIN ${tUsersName} ON ${tUsersCols.id}=${tConnectionsCols.from_id}
      WHERE ${tConnectionsCols.to_id}=${userId}
    `)

    const connections = [...approvedFromConnections, ...otherConnections]

    return connections.reduce(
      (acc, connection) => {
        acc[connection[tConnectionsCols.state]].push(apifyObject(connection))

        return acc
      }, {
        [CONNECTION_STATE_TYPE.APPROVED]: [],
        [CONNECTION_STATE_TYPE.BLOCKED]: [],
        [CONNECTION_STATE_TYPE.WAITING]: [],
      } as GroupedConnectionsType
    )
  })

export const approveConnection = (currentId: number, userId: number) =>
  database.queryBool(`
    UPDATE ${tConnectionsName}
    SET ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}', ${tConnectionsCols.date_created}=NOW() 
    WHERE ${tConnectionsCols.from_id}=$1 AND ${tConnectionsCols.to_id}=${currentId}
  `, [userId])

export const createConnectionRequest = (
  currentId: number,
  userId: number,
  message: string | null
) =>
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
