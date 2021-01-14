import { tHouseMemName, tHouseMemCols } from 'serverSrc/database/models/tables'
import { migrateWithQueries } from 'serverSrc/helpers/migrations'

module.exports = {
    up: async (conn, cb) => migrateWithQueries(cb,
      await conn.query(`
        ALTER TABLE ${tHouseMemName} 
        ADD ${tHouseMemCols.name} varchar(255) AFTER ${tHouseMemCols.role},
        MODIFY COLUMN ${tHouseMemCols.photo} varchar(140)
      `)
    ),
    down: async (conn, cb) => migrateWithQueries(cb,
      await conn.query(`
        ALTER TABLE ${tHouseMemName}
        DROP COLUMN ${tHouseMemCols.name},
        MODIFY COLUMN ${tHouseMemCols.photo} varchar(2083)
      `)
    ),
}
