import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () => {}),
  down: async (conn, cb) => await migrateWithQueries(cb, async () => {}),
}
