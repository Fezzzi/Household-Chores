import { migrateWithQueries } from 'serverSrc/helpers/migrations'
import {
  tHouseMemName, tHouseMemCols, tHouseholdsName, tHouseholdsCols, tHouseInvName, tHouseInvCols,
} from 'serverSrc/database/models/tables'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
      CREATE TABLE ${tHouseholdsName} (
        ${tHouseholdsCols.id} INT AUTO_INCREMENT PRIMARY KEY,
        ${tHouseholdsCols.name} VARCHAR(255) NOT NULL,
        ${tHouseholdsCols.photo} VARCHAR(2083),
        ${tHouseholdsCols.date_created} DATETIME NOT NULL
      )
    `)
    && await conn.query(`
      CREATE TABLE ${tHouseMemName} (
        ${tHouseMemCols.id_household} INT NOT NULL,
        ${tHouseMemCols.id_user} INT NOT NULL,
        ${tHouseMemCols.id_from} INT NOT NULL,
        ${tHouseMemCols.role} ENUM('${HOUSEHOLD_ROLE_TYPE.ADMIN}', '${HOUSEHOLD_ROLE_TYPE.MANAGER}', '${HOUSEHOLD_ROLE_TYPE.MEMBER}') NOT NULL DEFAULT '${HOUSEHOLD_ROLE_TYPE.MEMBER}',
        ${tHouseMemCols.photo} VARCHAR(2083),
        ${tHouseMemCols.date_joined} DATETIME NOT NULL,
        PRIMARY KEY (${tHouseMemCols.id_household}, ${tHouseMemCols.id_user})
      )
    `)
    && await conn.query(`
      CREATE TABLE ${tHouseInvName} (
        ${tHouseInvCols.id_household} INT NOT NULL,
        ${tHouseInvCols.id_from} INT NOT NULL,
        ${tHouseInvCols.id_to} INT NOT NULL,
        ${tHouseInvCols.message} VARCHAR(255) DEFAULT NULL,
        ${tHouseInvCols.date_created} DATETIME NOT NULL,
        PRIMARY KEY (${tHouseInvCols.id_household}, ${tHouseInvCols.id_to})
      )
    `)
  ),
  down: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`DROP TABLE ${tHouseholdsName}`)
    && await conn.query(`DROP TABLE ${tHouseMemName}`)
    && await conn.query(`DROP TABLE ${tHouseInvName}`)
  ),
}
