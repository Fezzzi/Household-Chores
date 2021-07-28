import { MigrationBuilder } from 'node-pg-migrate'

import {
  tActivityCols,
  tActivityName,
  tNotifySettingsCols,
  tNotifySettingsName,
  tUsersCols,
  tUsersName
} from 'serverSrc/database/models/tables'

exports.up = (pgm: MigrationBuilder) => {
  pgm.sql(`
    CREATE TABLE ${tActivityName} (
      ${tActivityCols.id} SERIAL PRIMARY KEY,
      ${tActivityCols.id_user} INTEGER NOT NULL REFERENCES ${tUsersName} (${tUsersCols.id}) ON DELETE CASCADE,
      ${tActivityCols.message} VARCHAR(2083) NOT NULL,
      ${tActivityCols.link} VARCHAR(255),
      ${tActivityCols.date_seen} TIMESTAMPTZ,
      ${tActivityCols.date_created} TIMESTAMPTZ NOT NULL
    )
  `)
  pgm.sql(`
    CREATE TABLE ${tNotifySettingsName} (
      ${tNotifySettingsCols.id_user} INTEGER PRIMARY KEY REFERENCES ${tUsersName} (${tUsersCols.id}) ON DELETE CASCADE,
      ${tNotifySettingsCols.email_notifications} BOOLEAN DEFAULT FALSE,
      ${tNotifySettingsCols.browser_notifications} BOOLEAN DEFAULT FALSE,
      ${tNotifySettingsCols.mobile_notifications} BOOLEAN DEFAULT FALSE,
      ${tNotifySettingsCols.connection_request} BOOLEAN DEFAULT FALSE,
      ${tNotifySettingsCols.connection_approval} BOOLEAN DEFAULT FALSE,
      ${tNotifySettingsCols.household_invitation} BOOLEAN DEFAULT FALSE,
      ${tNotifySettingsCols.household_joining} BOOLEAN DEFAULT FALSE,
      ${tNotifySettingsCols.household_leaving} BOOLEAN DEFAULT FALSE,
      ${tNotifySettingsCols.household_deleting} BOOLEAN DEFAULT FALSE,
      ${tNotifySettingsCols.household_expelling} BOOLEAN DEFAULT FALSE
    )
  `)
}

exports.down = (pgm: MigrationBuilder) => {
  pgm.sql(`DROP TABLE ${tActivityName}`)
  pgm.sql(`DROP TABLE ${tNotifySettingsName}`)
}
