import util from 'util';

import { Connection, handleConnectionError } from './connection';
import { Logger } from '../helpers/logger';
import { DB_LOG, ERROR_LOG } from '../constants/logs';
import {queryCallback} from "~/node_modules/@types/mysql";

const toLine = (sql: string) => sql.replace('\n', '');

const getQueryPromise = (): ((options: string, values: any, callback?: queryCallback) => Promise<any>) =>
  util.promisify(Connection.get().query);

export const database = {
  query: (sql: string, params: any = [], logSQL: boolean = true): any =>
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
  beginTransaction: Connection.get().beginTransaction,
  commit: Connection.get().commit,
  rollback: Connection.get().rollback,
  end: Connection.get().end,
};
