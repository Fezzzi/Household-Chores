import { MigrationBuilder } from 'node-pg-migrate'

import { tUsersCols, tUsersName } from 'serverSrc/database/tables'

exports.up = (pgm: MigrationBuilder) => pgm.sql(`
  CREATE TABLE ${tUsersName} (
    ${tUsersCols.id} SERIAL PRIMARY KEY,
    ${tUsersCols.google_id} VARCHAR(255) UNIQUE DEFAULT NULL,
    ${tUsersCols.facebook_id} VARCHAR(255) UNIQUE DEFAULT NULL,
    ${tUsersCols.email} VARCHAR(255) NOT NULL,
    ${tUsersCols.nickname} VARCHAR(255) NOT NULL,
    ${tUsersCols.password} CHAR(60) NOT NULL,
    ${tUsersCols.photo} VARCHAR(2083),
    ${tUsersCols.confirmed} BOOLEAN NOT NULL DEFAULT FALSE,
    ${tUsersCols.date_registered} TIMESTAMPTZ NOT NULL,
    ${tUsersCols.date_last_active} TIMESTAMPTZ
  )
`)

exports.down = (pgm: MigrationBuilder) => pgm.sql(`
  DROP TABLE ${tUsersName}
`)
