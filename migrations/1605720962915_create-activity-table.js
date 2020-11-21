import ACTIVITY_TABLE from 'serverSrc/database/models/tables/activity';
import NOTIFICATION_SETTINGS_TABLE from 'serverSrc/database/models/tables/notification_settings';
import USERS_TABLE from 'serverSrc/database/models/tables/users';
import { migrateWithQueries } from 'serverSrc/helpers/migrations';

const { columns: activityCols, name: tActivityName } = ACTIVITY_TABLE;
const { columns: notifyCols, name: tNotifyName } = NOTIFICATION_SETTINGS_TABLE;
const { columns: { id }, name: tUsersName } = USERS_TABLE;

module.exports = {
  up: async (conn, cb) => migrateWithQueries(cb,
    await conn.query(`
      CREATE TABLE ${tActivityName} (
        ${activityCols.id} INT AUTO_INCREMENT PRIMARY KEY,
        ${activityCols.id_user} INT NOT NULL,
        ${activityCols.message} VARCHAR(2083) NOT NULL,
        ${activityCols.link} VARCHAR(255),
        ${activityCols.seen} TINYINT(1) DEFAULT 0,
        ${activityCols.date_created} DATETIME NOT NULL,
        FOREIGN KEY (${activityCols.id_user}) REFERENCES ${tUsersName}(${id})
      )
    `)
    && await conn.query(`
      CREATE TABLE ${tNotifyName} (
        ${notifyCols.id_user} INT PRIMARY KEY,
        ${notifyCols.email_notifications} TINYINT(1) DEFAULT 0,
        ${notifyCols.browser_notifications} TINYINT(1) DEFAULT 0,
        ${notifyCols.mobile_notifications} TINYINT(1) DEFAULT 0,
        ${notifyCols.connection_request} TINYINT(1) DEFAULT 0,
        ${notifyCols.connection_approval} TINYINT(1) DEFAULT 0,
        ${notifyCols.household_invitation} TINYINT(1) DEFAULT 0,
        ${notifyCols.household_joining} TINYINT(1) DEFAULT 0,
        ${notifyCols.household_leaving} TINYINT(1) DEFAULT 0,
        ${notifyCols.household_deleting} TINYINT(1) DEFAULT 0,
        ${notifyCols.household_expelling} TINYINT(1) DEFAULT 0,
        FOREIGN KEY (${notifyCols.id_user}) REFERENCES ${tUsersName}(${id}) ON DELETE CASCADE
      )
    `)
    && await conn.query(`
      INSERT INTO ${tNotifyName} (${notifyCols.id_user}) SELECT ${id} FROM ${tUsersName}
    `)
  ),
  down: async (conn, cb) => migrateWithQueries(cb,
    await conn.query(`DROP TABLE ${tActivityName}`)
    && await conn.query(`DROP TABLE ${tNotifyName}`)
  ),
}
