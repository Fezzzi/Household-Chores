import { migrateWithQueries } from 'serverSrc/helpers/migrations'
import { tDialogsName } from 'serverSrc/database/models/tables'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () =>
    // We don't want to await result of this query as it might fail
    conn.query(`
      ALTER TABLE ${tDialogsName}
      RENAME COLUMN household_user_deleting TO household_member_deleting
    `)
  ),
  down: async (conn, cb) => await migrateWithQueries(cb, async () =>
    // We don't want to await result of this query as it might fail
    conn.query(`
      ALTER TABLE ${tDialogsName}
      RENAME COLUMN household_member_deleting TO household_user_deleting
    `)
  ),
}
