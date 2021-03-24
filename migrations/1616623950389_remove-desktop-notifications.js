import { tNotifySettingsName, tNotifySettingsCols } from 'serverSrc/database/models/tables'
import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
        ALTER TABLE ${tNotifySettingsName} 
        DROP COLUMN ${tNotifySettingsCols.browser_notifications}
      `)
  ),
  down: async (conn, cb) => await migrateWithQueries(cb, async () =>
    await conn.query(`
        ALTER TABLE ${tNotifySettingsName}
        ADD ${tNotifySettingsCols.browser_notifications} TINYINT(1) DEFAULT 0 AFTER ${tNotifySettingsCols.email_notifications}
      `)
  ),
}
