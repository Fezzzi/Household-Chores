import { migrateWithQueries } from 'serverSrc/helpers/migrations'
import { tActivityName, tActivityCols } from 'serverSrc/database/models/tables'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () => {
    conn.query(`
      ALTER TABLE ${tActivityName}
      DROP COLUMN seen,
      ADD ${tActivityCols.date_seen} DATETIME
    `)

    return true
  }),
  down: async (conn, cb) => await migrateWithQueries(cb, async () =>
    // We don't want to await results of these queries as they might fail
    conn.query(`
      ALTER TABLE ${tActivityName}
      DROP COLUMN ${tActivityCols.date_seen},
      ADD seen TINYINT(1) DEFAULT 0
    `)
  ),
}
