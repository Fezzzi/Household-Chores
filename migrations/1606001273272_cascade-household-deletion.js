import {
  tHouseMemName, tHouseMemCols, tHouseholdsName, tHouseholdsCols, tHouseInvName, tHouseInvCols,
} from 'serverSrc/database/models/tables'
import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
      ALTER TABLE ${tHouseMemName}
      ADD CONSTRAINT FK_HouseholdMemId
      FOREIGN KEY (${tHouseMemCols.id_household}) REFERENCES ${tHouseholdsName}(${tHouseholdsCols.id})
      ON DELETE CASCADE
    `)
    && await conn.query(`
      ALTER TABLE ${tHouseInvName}
      ADD CONSTRAINT FK_HouseholdInvId
      FOREIGN KEY (${tHouseInvCols.id_household}) REFERENCES ${tHouseholdsName}(${tHouseholdsCols.id})
      ON DELETE CASCADE
    `)
  ),
  down: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
      ALTER TABLE ${tHouseMemName}
      DROP FOREIGN KEY FK_HouseholdMemId
    `)
    && await conn.query(`
      ALTER TABLE ${tHouseInvName}
      DROP FOREIGN KEY FK_HouseholdInvId
    `)
  ),
}
