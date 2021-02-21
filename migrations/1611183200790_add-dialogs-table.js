import { migrateWithQueries } from 'serverSrc/helpers/migrations'
import { tDialogsName, tDialogsCols, tUsersName, tUsersCols } from 'serverSrc/database/models/tables'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
      CREATE TABLE ${tDialogsName} (
        ${tDialogsCols.id_user} INT PRIMARY KEY,
        ${tDialogsCols.tutorial} TINYINT(1) NOT NULL DEFAULT 0,
        ${tDialogsCols.household_member_deleting} TINYINT(1) NOT NULL DEFAULT 0
      )
    `)
    && await conn.query(`
      ALTER TABLE ${tDialogsName}
      ADD CONSTRAINT FK_UserDialogs
      ADD FOREIGN KEY (${tDialogsName.id_user} REFERENCES ${tUsersName}(${tUsersCols.id}))
    `)
    && await conn.query(`
      INSERT INTO ${tDialogsName} (${tDialogsCols.id_user})
        SELECT ${tUsersCols.id}
        FROM ${tUsersName}
    `)
  ),
  down: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
      ALTER TABLE ${tDialogsName}
      DROP FOREIGN KEY FK_UserDialogs
    `)
    && await conn.query(`DROP TABLE ${tDialogsName}`)
  ),
}
