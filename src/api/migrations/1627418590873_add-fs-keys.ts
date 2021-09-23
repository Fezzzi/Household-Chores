import { MigrationBuilder } from 'node-pg-migrate'

import { tUsersCols, tUsersName } from 'api/database/tables'

exports.up = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tUsersName} 
  ADD ${tUsersCols.file_system_key} varchar(40) NOT NULL,
  ALTER COLUMN ${tUsersCols.photo} TYPE VARCHAR(140)
`)

exports.down = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tUsersName}
  DROP COLUMN ${tUsersCols.file_system_key},
  ALTER COLUMN ${tUsersCols.photo} TYPE VARCHAR(2083)
`)
