import USERS_TABLE from 'serverSrc/database/models/tables/users';
import { migrateWithQueries } from 'serverSrc/helpers/migrations';

const { columns: { fs_key, photo }, name: tName } = USERS_TABLE;

module.exports = {
  up: (conn, cb) => migrateWithQueries(cb,
    conn.query(`
      ALTER TABLE ${tName} 
      ADD ${fs_key} varchar(40),
      MODIFY COLUMN ${photo} VARCHAR(140)
    `)
  ),
  down: (conn, cb) => migrateWithQueries(cb,
    conn.query(`
      ALTER TABLE ${tName}
      DROP COLUMN ${fs_key},
      MODIFY COLUMN ${photo} VARCHAR(2083),
    `)
  ),
}
