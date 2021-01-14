import { tUsersName, tUsersCols, tConnectionsName, tConnectionsCols } from 'serverSrc/database/models/tables'
import { USER_VISIBILITY_TYPE, CONNECTION_STATE_TYPE } from 'shared/constants'
import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
  up: async (conn, cb) => migrateWithQueries(cb,
    await conn.query(`
      CREATE TABLE ${tConnectionsName} (
        ${tConnectionsCols.id_from} INT NOT NULL,
        ${tConnectionsCols.id_to} INT NOT NULL,
        ${tConnectionsCols.message} VARCHAR(255) DEFAULT NULL,
        ${tConnectionsCols.state} ENUM(
          '${CONNECTION_STATE_TYPE.WAITING}', '${CONNECTION_STATE_TYPE.APPROVED}', '${CONNECTION_STATE_TYPE.BLOCKED}'
        ) NOT NULL DEFAULT '${CONNECTION_STATE_TYPE.WAITING}',
        ${tConnectionsCols.date_created} DATETIME NOT NULL,
        PRIMARY KEY (${tConnectionsCols.id_from}, ${tConnectionsCols.id_to})
      )
    `)
    && await conn.query(`
      ALTER TABLE ${tUsersName}
      ADD ${tUsersCols.visibility} ENUM(
        '${USER_VISIBILITY_TYPE.ALL}', '${USER_VISIBILITY_TYPE.FOF}'
      ) NOT NULL DEFAULT '${USER_VISIBILITY_TYPE.ALL}'
    `)
  ),
  down: async (conn, cb) => migrateWithQueries(cb,
    await conn.query(`DROP TABLE ${tConnectionsName}`)
    && await conn.query(`ALTER TABLE ${tUsersName} DROP COLUMN ${tUsersCols.visibility}`)
  ),
}

