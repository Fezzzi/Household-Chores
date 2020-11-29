import {
  tHouseMemName, tHouseMemCols, tHouseholdsName, tHouseholdsCols, tHouseInvName, tHouseInvCols,
} from 'serverSrc/database/models/tables'
import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
  up: async (conn, cb) => migrateWithQueries(cb,
    await conn.query(`
      ALTER TABLE ${tHouseMemName}
      ADD CONSTRAINT FK_HouseholdId
      ADD FOREIGN KEY (${tHouseMemCols.id_household} REFERENCES ${tHouseholdsName}(${tHouseholdsCols.id_household}))
    `)
    && await conn.query(`
      ALTER TABLE ${tHouseInvName}
      ADD CONSTRAINT FK_HouseholdId
      ADD FOREIGN KEY (${tHouseInvCols.id_household} REFERENCES ${tHouseholdsName}(${tHouseholdsCols.id_household}))
    `)
  ),
  down: async (conn, cb) => migrateWithQueries(cb,
    await conn.query(`
      ALTER TABLE ${tHouseMemName}
      DROP FOREIGN KEY FK_HouseholdId
    `)
    && await conn.query(`
      ALTER TABLE ${tHouseInvName}
      DROP FOREIGN KEY FK_HouseholdId
    `)
  ),
}
