import { MigrationBuilder } from 'node-pg-migrate'

import { tHouseMemCols, tHouseMemName } from 'serverSrc/database/models/tables'

exports.up = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tHouseMemName} 
  ADD ${tHouseMemCols.nickname} varchar(255),
  ALTER COLUMN ${tHouseMemCols.photo} TYPE varchar(140)
`)

exports.down = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tHouseMemName}
  DROP COLUMN ${tHouseMemCols.nickname},
  ALTER COLUMN ${tHouseMemCols.photo} TYPE VARCHAR(2083)
`)
