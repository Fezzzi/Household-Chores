import { MigrationBuilder } from 'node-pg-migrate'

import {
  tHouseholdsCols,
  tHouseholdsName,
  tHouseInvCols,
  tHouseInvName,
  tHouseMemCols,
  tHouseMemName,
  tUsersCols,
  tUsersName,
} from 'api/database/tables'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'

exports.up = (pgm: MigrationBuilder) => {
  pgm.sql(`
    CREATE TABLE ${tHouseholdsName} (
      ${tHouseholdsCols.household_id} SERIAL PRIMARY KEY,
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
      ${tHouseMemCols.household_id} INTEGER NOT NULL REFERENCES ${tHouseholdsName} (${tHouseholdsCols.household_id}) ON DELETE CASCADE,
      ${tHouseMemCols.user_id} INTEGER NOT NULL REFERENCES ${tUsersName} (${tUsersCols.user_id}) ON DELETE CASCADE,
      ${tHouseMemCols.from_id} INTEGER NOT NULL REFERENCES ${tUsersName} (${tUsersCols.user_id}) ON DELETE CASCADE,
      ${tHouseMemCols.role} householdRole NOT NULL DEFAULT '${HOUSEHOLD_ROLE_TYPE.MEMBER}',
      ${tHouseMemCols.photo} VARCHAR(2083),
      ${tHouseMemCols.date_joined} TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (${tHouseMemCols.household_id}, ${tHouseMemCols.user_id})
    )
  `)
  pgm.sql(`
    CREATE TABLE ${tHouseInvName} (
      ${tHouseInvCols.household_id} INT NOT NULL REFERENCES ${tHouseholdsName} (${tHouseholdsCols.household_id}) ON DELETE CASCADE,
      ${tHouseInvCols.from_id} INT NOT NULL REFERENCES ${tUsersName} (${tUsersCols.user_id}) ON DELETE CASCADE,
      ${tHouseInvCols.to_id} INT NOT NULL REFERENCES ${tUsersName} (${tUsersCols.user_id}) ON DELETE CASCADE,
      ${tHouseInvCols.message} VARCHAR(255) DEFAULT NULL,
      ${tHouseInvCols.date_created} TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (${tHouseInvCols.household_id}, ${tHouseInvCols.to_id})
    )
  `)
}

exports.down = (pgm: MigrationBuilder) => {
  pgm.sql(`DROP TABLE ${tHouseInvName}`)
  pgm.sql(`DROP TABLE ${tHouseMemName}`)
  pgm.sql('DROP TYPE IF EXISTS householdRole')
  pgm.sql(`DROP TABLE ${tHouseholdsName}`)
}
