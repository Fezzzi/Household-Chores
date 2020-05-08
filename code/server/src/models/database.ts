import { FieldInfo, MysqlError, queryCallback } from 'mysql';

import { Connection } from './connection';
import { Logger } from '../helpers/logger';
import { DB_LOG } from '../constants/logs';

export const database = {
  query: (sql: string, cb: queryCallback) => {
    Connection.get().query(sql, (err: MysqlError | null, results?: any, fields?: FieldInfo[]) => {
      Logger(DB_LOG, `${sql}; (${(err && err.message) || 'OK'})\n`);
      if (err && err.fatal) {
        Logger(DB_LOG, `FATAL ERROR (Query) [${err.message}] - Resetting connection...\n`);
        Connection.reset();
      }
      cb(err, results, fields);
    });
  },
  beginTransaction: Connection.get().beginTransaction,
  commit: Connection.get().commit,
  rollback: Connection.get().rollback,
  end: Connection.get().end,
};
