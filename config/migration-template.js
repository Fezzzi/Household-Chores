import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
  up: async (conn, cb) => migrateWithQueries(cb, true),
  down: async (conn, cb) => migrateWithQueries(cb, true),
}
