import { tUsersName, tUsersCols } from 'serverSrc/database/models/tables'
import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
      ALTER TABLE ${tUsersName} 
      ADD ${tUsersCols.locale} varchar(12) NOT NULL DEFAULT 'en_US'
    `)
  ),
  down: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
      ALTER TABLE ${tUsersName}
      DROP COLUMN ${tUsersCols.locale}
    `)
  ),
}
