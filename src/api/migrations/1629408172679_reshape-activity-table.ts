import { MigrationBuilder } from 'node-pg-migrate'

import { tActivityName, tActivityCols } from 'api/database/tables'

exports.up = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tActivityName} 
  ADD ${tActivityCols.message_texts} text[] NOT NULL DEFAULT '{}',
  ADD ${tActivityCols.message_photos} text[] NOT NULL DEFAULT '{}'
`)

exports.down = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tActivityName}
  DROP COLUMN ${tActivityCols.message_texts},
  DROP COLUMN ${tActivityCols.message_photos}
`)
