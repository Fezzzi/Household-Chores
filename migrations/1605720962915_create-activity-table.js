import {
  tActivityName, tActivityCols, tNotifySettingsName, tNotifySettingsCols, tUsersName, tUsersCols,
} from 'serverSrc/database/models/tables'
import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
  up: async (conn, cb) => migrateWithQueries(cb,
    await conn.query(`
      CREATE TABLE ${tActivityName} (
        ${tActivityCols.id} INT AUTO_INCREMENT PRIMARY KEY,
        ${tActivityCols.id_user} INT NOT NULL,
        ${tActivityCols.message} VARCHAR(2083) NOT NULL,
        ${tActivityCols.link} VARCHAR(255),
        ${tActivityCols.seen} TINYINT(1) DEFAULT 0,
        ${tActivityCols.date_created} DATETIME NOT NULL,
        FOREIGN KEY (${tActivityCols.id_user}) REFERENCES ${tUsersName}(${tUsersCols.id})
      )
    `)
    && await conn.query(`
      CREATE TABLE ${tNotifySettingsName} (
        ${tNotifySettingsCols.id_user} INT PRIMARY KEY,
        ${tNotifySettingsCols.email_notifications} TINYINT(1) DEFAULT 0,
        ${tNotifySettingsCols.browser_notifications} TINYINT(1) DEFAULT 0,
        ${tNotifySettingsCols.mobile_notifications} TINYINT(1) DEFAULT 0,
        ${tNotifySettingsCols.connection_request} TINYINT(1) DEFAULT 0,
        ${tNotifySettingsCols.connection_approval} TINYINT(1) DEFAULT 0,
        ${tNotifySettingsCols.household_invitation} TINYINT(1) DEFAULT 0,
        ${tNotifySettingsCols.household_joining} TINYINT(1) DEFAULT 0,
        ${tNotifySettingsCols.household_leaving} TINYINT(1) DEFAULT 0,
        ${tNotifySettingsCols.household_deleting} TINYINT(1) DEFAULT 0,
        ${tNotifySettingsCols.household_expelling} TINYINT(1) DEFAULT 0,
        FOREIGN KEY (${tNotifySettingsCols.id_user}) REFERENCES ${tUsersName}(${tUsersCols.id}) ON DELETE CASCADE
      )
    `)
    && await conn.query(`
      INSERT INTO ${tNotifySettingsName} (${tNotifySettingsCols.id_user}) SELECT ${tUsersCols.id} FROM ${tUsersName}
    `)
  ),
  down: async (conn, cb) => migrateWithQueries(cb,
    await conn.query(`DROP TABLE ${tActivityName}`)
    && await conn.query(`DROP TABLE ${tNotifySettingsName}`)
  ),
}
