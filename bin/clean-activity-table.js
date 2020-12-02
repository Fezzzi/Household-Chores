import { database } from 'serverSrc/database'
import { tActivityName, tActivityCols } from 'serverSrc/database/models/tables'

database.query(`
  DELETE FROM ${tActivityName} WHERE ${tActivityCols.date_created} < UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 10 DAY))
  `, [], false
)
  .then(() => process.exit())
  .catch(err => {
    console.error(err)
    process.exit()
  })
