import { MigrationBuilder } from 'node-pg-migrate'

import {
  tHouseholdsCols,
  tHouseholdsName,
  tHouseInvCols,
  tHouseInvName,
  tHouseMemCols,
  tHouseMemName,
  tUsersCols,
  tUsersName
} from 'serverSrc/database/models/tables'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'

exports.up = (pgm: MigrationBuilder) => {
  pgm.sql(`
    CREATE TABLE ${tHouseholdsName} (
      ${tHouseholdsCols.id} SERIAL PRIMARY KEY,
      ${tHouseholdsCols.name} VARCHAR(255) NOT NULL,
      ${tHouseholdsCols.photo} VARCHAR(2083),
      ${tHouseholdsCols.date_created} TIMESTAMPTZ NOT NULL
    )
  `)
  pgm.sql(`
    CREATE TYPE householdRole AS ENUM (
      '${HOUSEHOLD_ROLE_TYPE.ADMIN}', '${HOUSEHOLD_ROLE_TYPE.MANAGER}', '${HOUSEHOLD_ROLE_TYPE.MEMBER}'
    )
  `)
  pgm.sql(`
    CREATE TABLE ${tHouseMemName} (
      ${tHouseMemCols.id_household} INTEGER NOT NULL REFERENCES ${tHouseholdsName} (${tHouseholdsCols.id}) ON DELETE CASCADE,
      ${tHouseMemCols.id_user} INTEGER NOT NULL REFERENCES ${tUsersName} (${tUsersCols.id}) ON DELETE CASCADE,
      ${tHouseMemCols.id_from} INTEGER NOT NULL REFERENCES ${tUsersName} (${tUsersCols.id}) ON DELETE CASCADE,
      ${tHouseMemCols.role} householdRole NOT NULL DEFAULT '${HOUSEHOLD_ROLE_TYPE.MEMBER}',
      ${tHouseMemCols.photo} VARCHAR(2083),
      ${tHouseMemCols.date_joined} TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (${tHouseMemCols.id_household}, ${tHouseMemCols.id_user})
    )
  `)
  pgm.sql(`
    CREATE TABLE ${tHouseInvName} (
      ${tHouseInvCols.id_household} INT NOT NULL REFERENCES ${tHouseholdsName} (${tHouseholdsCols.id}) ON DELETE CASCADE,
      ${tHouseInvCols.id_from} INT NOT NULL REFERENCES ${tUsersName} (${tUsersCols.id}) ON DELETE CASCADE,
      ${tHouseInvCols.id_to} INT NOT NULL REFERENCES ${tUsersName} (${tUsersCols.id}) ON DELETE CASCADE,
      ${tHouseInvCols.message} VARCHAR(255) DEFAULT NULL,
      ${tHouseInvCols.date_created} TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (${tHouseInvCols.id_household}, ${tHouseInvCols.id_to})
    )
  `)
}

exports.down = (pgm: MigrationBuilder) => {
  pgm.sql(`DROP TABLE ${tHouseInvName}`)
  pgm.sql(`DROP TABLE ${tHouseMemName}`)
  pgm.sql('DROP TYPE IF EXISTS householdRole')
  pgm.sql(`DROP TABLE ${tHouseholdsName}`)
}
