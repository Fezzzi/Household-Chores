import { tUsersName, tUsersCols } from 'serverSrc/database/models/tables'
import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
      ALTER TABLE ${tUsersName} 
      ADD ${tUsersCols.fs_key} varchar(40),
      MODIFY COLUMN ${tUsersCols.photo} VARCHAR(140)
    `)
  ),
  down: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
      ALTER TABLE ${tUsersName}
      DROP COLUMN ${tUsersCols.fs_key},
      MODIFY COLUMN ${tUsersCols.photo} VARCHAR(2083)
    `)
  ),
}
