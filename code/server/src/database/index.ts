import util from 'util';
import { queryCallback } from 'mysql';

import { Connection, handleConnectionError } from './connection';
import { Logger } from '../helpers/logger';
import { DB_LOG, ERROR_LOG } from '../constants/logs';

const toLine = (sql: string) => sql.replace(/(\r\n|\r|\n)+/g, '').trim();

const getQueryPromise = (): ((options: string, values: any, callback?: queryCallback) => Promise<any>) =>
  util.promisify(Connection.get().query);

export const database = {
  query: (sql: string, params: any = [], logSQL = true): any =>
    getQueryPromise()
      .call(Connection.get(), sql, params)
      .then(value => {
        Logger(DB_LOG, `${toLine(`${logSQL ? `${sql} [${params}]` : '-'}; OK`)}`);
        return value;
      }, reason => {
        const message = `${toLine(`${logSQL ? `${sql} [${params}]` : '-'}; (${reason.message})`)}`;
        Logger(DB_LOG, message);
        Logger(ERROR_LOG, message);
        handleConnectionError(reason, 'Query');
        return null;
      }),
  withTransaction: async (func: () => Promise<void>): Promise<void> => {
    try {
      Logger(DB_LOG, 'Beginning transaction...');
      Connection.get().beginTransaction();
      await func();
      Connection.get().commit();
      Logger(DB_LOG, '...transaction finished.');
    } catch (err) {
      Logger(DB_LOG, '...transaction failed, rolling back!');
      Connection.get().rollback();
    }
  },
  beginTransaction: Connection.get().beginTransaction,
  commit: Connection.get().commit,
  rollback: Connection.get().rollback,
  end: Connection.get().end,
};
