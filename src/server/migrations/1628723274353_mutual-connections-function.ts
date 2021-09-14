import { MigrationBuilder } from 'node-pg-migrate'

import { tConnectionsCols, tConnectionsName } from 'serverSrc/database/tables'
import { fMutualConnectionsName, fMutualConnectionsOut } from 'serverSrc/database/functions'
import { CONNECTION_STATE_TYPE } from 'shared/constants'

exports.up = (pgm: MigrationBuilder) => pgm.sql(`
  CREATE FUNCTION ${fMutualConnectionsName}(friendIds integer[])
    RETURNS TABLE (${fMutualConnectionsOut.target_user_id} integer, ${fMutualConnectionsOut.mutual_connections} bigint)
  AS
  $body$
    SELECT
      mutual_friends.target_user_id AS ${fMutualConnectionsOut.target_user_id},
      COUNT(*) AS ${fMutualConnectionsOut.mutual_connections}
    FROM (
      SELECT ${tConnectionsCols.from_id} AS target_user_id, ${tConnectionsCols.to_id} AS friend_id
      FROM ${tConnectionsName}
      WHERE ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
        AND ${tConnectionsCols.to_id}=ANY(friendIds)
      UNION
      SELECT ${tConnectionsCols.to_id} AS target_user_id, ${tConnectionsCols.from_id} AS friend_id
        FROM ${tConnectionsName}
        WHERE ${tConnectionsCols.state}='${CONNECTION_STATE_TYPE.APPROVED}'
          AND ${tConnectionsCols.from_id}=ANY(friendIds)
    ) as mutual_friends
    GROUP BY target_user_id
  $body$
  LANGUAGE SQL
`)

exports.down = (pgm: MigrationBuilder) => pgm.sql(`DROP FUNCTION ${fMutualConnectionsName}`)
