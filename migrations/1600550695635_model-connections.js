import CONNECTIONS_TABLE from 'serverSrc/database/models/tables/connections';
import USERS_TABLE from 'serverSrc/database/models/tables/users';
import CONNECTION_STATE_TYPE from 'serverSrc/constants/connectionStateType';
import USER_VISIBILITY_TYPE from 'serverSrc/constants/userVisibilityType';
import { migrateWithQueries } from 'serverSrc/helpers/migrations';

const { columns: { id_from, id_to, message, state, date_created } } = CONNECTIONS_TABLE;

module.exports = {
  up: (conn, cb) => migrateWithQueries(cb,
    conn.query(`
      CREATE TABLE ${CONNECTIONS_TABLE.name} (
        ${id_from} INT NOT NULL,
        ${id_to} INT NOT NULL,
        ${message} VARCHAR(255) DEFAULT NULL,
        ${state} ENUM('${CONNECTION_STATE_TYPE.WAITING}', '${CONNECTION_STATE_TYPE.APPROVED}', '${CONNECTION_STATE_TYPE.BLOCKED}') NOT NULL DEFAULT '${CONNECTION_STATE_TYPE.WAITING}',
        ${date_created} DATETIME NOT NULL,
        PRIMARY KEY (${id_from}, ${id_to})
      )
    `)
    && conn.query(`
      ALTER TABLE ${USERS_TABLE.name} ADD ${USERS_TABLE.columns.visibility} ENUM('${USER_VISIBILITY_TYPE.ALL}', '${USER_VISIBILITY_TYPE.FOF}') NOT NULL DEFAULT '${USER_VISIBILITY_TYPE.ALL}'
    `)
  ),
  down: (conn, cb) => migrateWithQueries(cb,
    conn.query(`DROP TABLE ${CONNECTIONS_TABLE.name}`)
    && conn.query(`ALTER TABLE ${USERS_TABLE.name} DROP COLUMN ${USERS_TABLE.columns.visibility}`)
  ),
}
