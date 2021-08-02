import { MigrationBuilder } from 'node-pg-migrate'

import { tUsersCols, tUsersName } from 'serverSrc/database/tables'
import { DEFAULT_LOCALE } from 'shared/constants'

exports.up = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tUsersName} 
  ADD ${tUsersCols.locale} varchar(12) NOT NULL DEFAULT '${DEFAULT_LOCALE}'
`)

exports.down = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tUsersName}
  DROP COLUMN ${tUsersCols.locale}
`)
