import { database } from 'serverSrc/database'
import { tActivityName, tActivityCols } from 'serverSrc/database/tables'

database.query(`
  DELETE FROM ${tActivityName}
  WHERE (${tActivityCols.date_seen} IS NOT NULL AND ${tActivityCols.date_seen} < DATE_SUB(NOW(), INTERVAL 7 DAY))
    OR ${tActivityCols.date_created} < DATE_SUB(NOW(), INTERVAL 1 MONTH)
  `
)
  // eslint-disable-next-line no-console
  .then((result: any) => console.log(`removed ${result?.affectedRows ?? 0} activity nodes`))
  .catch(console.error)
  .finally(() => process.exit())
