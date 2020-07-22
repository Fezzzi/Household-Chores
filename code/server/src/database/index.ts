import util from 'util';

import { Connection, handleConnectionError } from './connection';
import { Logger } from '../helpers/logger';
import { DB_LOG, ERROR_LOG } from '../constants/logs';

const toLine = (sql: string) => sql.replace('\n', '');

export const database = {
  query: (sql: string, logSQL = true): any =>
    util.promisify(Connection.get().query)
      .call(Connection.get(), sql)
      .then(value => {
        Logger(DB_LOG, `${toLine(`${logSQL ? sql : '-'}; OK`)}`);
        return value;
      }, reason => {
        const message = `${toLine(`${logSQL ? sql : '-'}; (${reason.message})`)}`;
        Logger(DB_LOG, message);
        Logger(ERROR_LOG, message);
        handleConnectionError(reason, 'Query');
        return null;
      }),
  beginTransaction: Connection.get().beginTransaction,
  commit: Connection.get().commit,
  rollback: Connection.get().rollback,
  end: Connection.get().end,
};
