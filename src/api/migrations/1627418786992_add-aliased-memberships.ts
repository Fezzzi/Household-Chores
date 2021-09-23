import { MigrationBuilder } from 'node-pg-migrate'

import { tHouseMemCols, tHouseMemName } from 'api/database/tables'

exports.up = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tHouseMemName} 
  ADD ${tHouseMemCols.nickname} varchar(255) NOT NULL,
  ALTER COLUMN ${tHouseMemCols.photo} TYPE varchar(140),
  ALTER COLUMN ${tHouseMemCols.photo} SET NOT NULL
`)

exports.down = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tHouseMemName}
  DROP COLUMN ${tHouseMemCols.nickname},
  ALTER COLUMN ${tHouseMemCols.photo} DROP NOT NULL,
  ALTER COLUMN ${tHouseMemCols.photo} TYPE VARCHAR(2083)
`)
