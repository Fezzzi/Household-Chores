import HOUSEHOLD_MEMBERS from 'serverSrc/database/models/tables/household_members';
import { migrateWithQueries } from 'serverSrc/helpers/migrations';

const { columns: { name, role, photo }, name: tName } = HOUSEHOLD_MEMBERS;

module.exports = {
    up: (conn, cb) => migrateWithQueries(cb,
      conn.query(`
      ALTER TABLE ${tName} 
      ADD ${name} varchar(255) AFTER ${role},
      MODIFY COLUMN ${photo} varchar(140)
    `)
    ),
    down: (conn, cb) => migrateWithQueries(cb,
      conn.query(`
      ALTER TABLE ${tName}
      DROP COLUMN ${name},
      MODIFY COLUMN ${photo} varchar(2083)
    `)
    ),
}
