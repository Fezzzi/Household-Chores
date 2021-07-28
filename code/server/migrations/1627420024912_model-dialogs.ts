import { MigrationBuilder } from 'node-pg-migrate'

import { tDialogsCols, tDialogsName, tUsersCols, tUsersName } from 'serverSrc/database/models/tables'

exports.up = (pgm: MigrationBuilder) => pgm.sql(`
  CREATE TABLE ${tDialogsName} (
    ${tDialogsCols.id_user} INTEGER PRIMARY KEY REFERENCES ${tUsersName} (${tUsersCols.id}) ON DELETE CASCADE,
    ${tDialogsCols.tutorial} BOOLEAN NOT NULL DEFAULT FALSE,
    ${tDialogsCols.household_member_deleting} BOOLEAN NOT NULL DEFAULT FALSE
  )
`)

exports.down = (pgm: MigrationBuilder) => pgm.sql(`
  DROP TABLE ${tDialogsName}
`)
