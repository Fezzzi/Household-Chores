import {FieldInfo, MysqlError, queryCallback} from "mysql";

import { connection } from './connection';
import logger from '../helpers/logger';
import { DB_LOG } from "../constants/logs";

export const database = {
  query: (sql: string, cb: queryCallback) => {
    connection.query(sql, (err: MysqlError | null, results?: any, fields?: FieldInfo[]) => {
      logger(DB_LOG, `${sql}; - ${(err && err.message) || 'QUERY OK'}`, "\n");
      cb(err, results, fields);
    });
  },
  beginTransaction: connection.beginTransaction,
  commit: connection.commit,
  rollback: connection.rollback,
  end: connection.end,
};
