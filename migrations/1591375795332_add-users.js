import { migrateWithQueries } from 'serverSrc/helpers/migrations'
import { tUsersName, tUsersCols } from 'serverSrc/database/models/tables'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
      CREATE TABLE ${tUsersName} (
        ${tUsersCols.id} INT AUTO_INCREMENT PRIMARY KEY,
        ${tUsersCols.google_id} VARCHAR(255) UNIQUE KEY DEFAULT NULL,
        ${tUsersCols.facebook_id} VARCHAR(255) UNIQUE KEY DEFAULT NULL,
        ${tUsersCols.email} VARCHAR(255) NOT NULL,
        ${tUsersCols.nickname} VARCHAR(255) NOT NULL,
        ${tUsersCols.password} CHAR(60) NOT NULL,
        ${tUsersCols.photo} VARCHAR(2083),
        ${tUsersCols.confirmed} TINYINT(1) NOT NULL DEFAULT 0,
        ${tUsersCols.date_registered} DATETIME NOT NULL,
        ${tUsersCols.date_last_active} DATETIME
      )
    `)
  ),
  down: async (conn, cb) => await migrateWithQueries(cb, async () => await conn.query(`DROP TABLE ${tUsersName}`)),
}
