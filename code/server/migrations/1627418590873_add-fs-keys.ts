import { MigrationBuilder } from 'node-pg-migrate'

import { tUsersCols, tUsersName } from 'serverSrc/database/models/tables'

exports.up = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tUsersName} 
  ADD ${tUsersCols.fs_key} varchar(40),
  ALTER COLUMN ${tUsersCols.photo} TYPE VARCHAR(140)
`)

exports.down = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tUsersName}
  DROP COLUMN ${tUsersCols.fs_key},
  ALTER COLUMN ${tUsersCols.photo} TYPE VARCHAR(2083)
`)
