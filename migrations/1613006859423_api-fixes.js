import { migrateWithQueries } from 'serverSrc/helpers/migrations'
import {
  tDialogsName, tDialogsCols, tUsersName, tUsersCols, tHouseMemName, tHouseMemCols,
} from 'serverSrc/database/models/tables'

module.exports = {
  up: async (conn, cb) => await migrateWithQueries(cb, async () => {
    //We don't want to await results of these queries as they might fail
    conn.query(`
      ALTER TABLE ${tDialogsName}
      RENAME COLUMN household_user_deleting TO ${ tDialogsCols.household_member_deleting }
    `)
    conn.query(`
      ALTER TABLE ${tUsersName}
      RENAME COLUMN google_id TO ${tUsersCols.id_google},
      RENAME COLUMN facebook_id TO ${tUsersCols.id_facebook}
    `)
    conn.query(`
      ALTER TABLE ${tHouseMemName}
      RENAME COLUMN name TO ${tHouseMemCols.nickname}
    `)

    return true
  }),
  down: async (conn, cb) => await migrateWithQueries(cb, async () => {
    // We don't want to await results of these queries as they might fail
    conn.query(`
      ALTER TABLE ${tDialogsName}
      RENAME COLUMN ${tDialogsCols.household_member_deleting} TO household_user_deleting
    `)
    conn.query(`
      ALTER TABLE ${tUsersName}
      RENAME COLUMN ${tUsersCols.id_google} TO google_id,
      RENAME COLUMN ${tUsersCols.id_facebook} TO facebook_id
    `)
    conn.query(`
      ALTER TABLE ${tHouseMemName}
      RENAME COLUMN ${tHouseMemCols.nickname} TO name
    `)

    return true
  }),
}
