import { MigrationBuilder } from 'node-pg-migrate'

import { tNotifySettingsCols, tNotifySettingsName } from 'serverSrc/database/tables'

exports.up = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tNotifySettingsName} 
  DROP COLUMN ${tNotifySettingsCols.browser_notifications}
`)

exports.down = (pgm: MigrationBuilder) => pgm.sql(`
  ALTER TABLE ${tNotifySettingsName}
  ADD ${tNotifySettingsCols.browser_notifications} BOOLEAN DEFAULT FALSE
`)
