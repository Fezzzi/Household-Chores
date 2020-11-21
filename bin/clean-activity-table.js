import { database } from 'serverSrc/database';
import ACTIVITY_TABLE from 'serverSrc/database/models/tables/users';

const { name: tActivityName, columns: tabActivityCols } = ACTIVITY_TABLE;

database.query(`
  DELETE FROM ${tActivityName} WHERE ${tabActivityCols.date_created} < UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 10 DAY))
  `, [], false
)
  .then(() => process.exit())
  .catch(err => {
    console.error(err);
    process.exit();
  });
