import { MigrationBuilder } from 'node-pg-migrate'

import { tConnectionsCols, tConnectionsName, tUsersCols, tUsersName } from 'serverSrc/database/tables'
import { CONNECTION_STATE_TYPE, USER_VISIBILITY_TYPE } from 'shared/constants'

exports.up = (pgm: MigrationBuilder) => {
  pgm.sql(`
    CREATE TYPE connectionStatus AS ENUM (
      '${CONNECTION_STATE_TYPE.WAITING}', '${CONNECTION_STATE_TYPE.APPROVED}', '${CONNECTION_STATE_TYPE.BLOCKED}'
    )
  `)
  pgm.sql(`
    CREATE TABLE ${tConnectionsName} (
      ${tConnectionsCols.from_id} INTEGER NOT NULL REFERENCES ${tUsersName} (${tUsersCols.user_id}) ON DELETE CASCADE,
      ${tConnectionsCols.to_id} INTEGER NOT NULL REFERENCES ${tUsersName} (${tUsersCols.user_id}) ON DELETE CASCADE,
      ${tConnectionsCols.message} VARCHAR(255) DEFAULT NULL,
      ${tConnectionsCols.state} connectionStatus NOT NULL DEFAULT '${CONNECTION_STATE_TYPE.WAITING}',
      ${tConnectionsCols.date_created} TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (${tConnectionsCols.from_id}, ${tConnectionsCols.to_id})
    )
  `)
  pgm.sql(`
    CREATE TYPE userVisibility AS ENUM (
      '${USER_VISIBILITY_TYPE.ALL}', '${USER_VISIBILITY_TYPE.FOF}'
    )
  `)
  pgm.sql(`
    ALTER TABLE ${tUsersName}
    ADD ${tUsersCols.visibility} userVisibility NOT NULL DEFAULT '${USER_VISIBILITY_TYPE.ALL}'
  `)
}

exports.down = (pgm: MigrationBuilder) => {
  pgm.sql(`DROP TABLE ${tConnectionsName}`)
  pgm.sql('DROP TYPE IF EXISTS connectionStatus')
  pgm.sql(`ALTER TABLE ${tUsersName} DROP COLUMN ${tUsersCols.visibility}`)
  pgm.sql('DROP TYPE IF EXISTS userVisibility')
}
