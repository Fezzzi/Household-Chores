import { tUsersName, tUsersCols } from 'serverSrc/database/models/tables'
import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
  up: async (conn, cb) => migrateWithQueries(cb,
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
    && await conn.query(`
      INSERT INTO ${tUsersName} (
        ${tUsersCols.email}, ${tUsersCols.nickname}, ${tUsersCols.password},
        ${tUsersCols.confirmed}, ${tUsersCols.date_registered}
      ) VALUES ('test@test.cz', 'test', '$2y$12$917uKopA7bPqkCDlHCyavO5fAch/CFYre7aANyqxnUqZZrNnQQQOy', 1, NOW())
    `)
  ),
  down: async (conn, cb) => migrateWithQueries(cb, await conn.query(`DROP TABLE ${tUsersName}`)),
}
