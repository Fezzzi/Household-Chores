import util from 'util'
import { PoolClient, QueryResult } from 'pg'
import { queryCallback } from 'mysql'

import { Connection, Pool, handleConnectionError } from './connection'
import { Logger } from '../../helpers/logger'
import { LOGS } from '../../constants'

const toLine = (sql: string) => sql.replace(/(\r\n|\r|\n)+/g, '').trim()

export const database = {
  /**
   * Executes given SQL query and returns raw QueryResult
   *
   * @param {string} sql - Optionally parametrized SQL command
   * @param {any[]} [params=[]] - Parameters for SQL command
   * @param {boolean} [logSQL=true] - Determines whether will the SQL command be logged into appropriate log file
   */
  queryRaw: async (sql: string, params: any[] = [], logSQL = true): Promise<QueryResult> => {
    try {
      const result = await Pool.get().query(sql, params)
      Logger(LOGS.DB_LOG, `${toLine(`${logSQL ? `${sql} [${params}]` : '-'}; OK`)}`)
      return result
    } catch (err) {
      const message = `${toLine(`${logSQL ? `${sql} [${params}]` : '-'}; (${err.message})`)}`
      Logger(LOGS.DB_LOG, message)
      Logger(LOGS.ERROR_LOG, message)
      throw err
    }
  },
  /**
   * Executes given SQL query and returns affected rows
   *
   * @param {string} sql - Optionally parametrized SQL command
   * @param {any[]} [params=[]] - Parameters for SQL command
   * @param {boolean} [logSQL=true] - Determines whether will the SQL command be logged into appropriate log file
   */
  query: async<T> (sql: string, params: any[] = [], logSQL = true): Promise<T[]> => {
    const result = await database.queryRaw(sql, params, logSQL)

    return result.rows
  },
  /**
   * Executes given SQL query and returns true/false based on the number of changed rows
   *
   * @param {string} sql - Optionally parametrized SQL command
   * @param {any[]} [params=[]] - Parameters for SQL command
   * @param {boolean} [logSQL=true] - Determines whether will the SQL command be logged into appropriate log file
   */
  queryBool: async (sql: string, params: any[] = [], logSQL = true): Promise<boolean> => {
    const result = await database.queryRaw(sql, params, logSQL)

    return result.rowCount > 0
  },
  // new Promise(resolve => {
  //   Pool.get().query(sql, params, (err, result) => {
  //     if (err) {
  //       const message = `${toLine(`${logSQL ? `${sql} [${params}]` : '-'}; (${err.message})`)}`
  //       Logger(LOGS.DB_LOG, message)
  //       Logger(LOGS.ERROR_LOG, message)
  //       resolve(null)
  //     } else {
  //       Logger(LOGS.DB_LOG, `${toLine(`${logSQL ? `${sql} [${params}]` : '-'}; OK`)}`)
  //       resolve(result)
  //     }
  //   })
  // }),
  /**
   * Wraps provided function execution with db's transactional statements
   *
   * @param {(client: PoolClient) => Promise<T>} func
   */
  withTransaction: async<T> (func: (client: PoolClient) => Promise<T>): Promise<T> => {
    let client

    try {
      client = await Pool.get().connect()
      Logger(LOGS.DB_LOG, 'Beginning transaction...')
    } catch (err) {
      Logger(LOGS.ERROR_LOG, 'Failed acquiring client for transaction!')
      throw err
    }

    try {
      await client.query('BEGIN')
      const result = await func(client)
      await client.query('COMMIT')
      Logger(LOGS.DB_LOG, '...transaction finished.')
      return result
    } catch (err) {
      await client.query('ROLLBACK')
      Logger(LOGS.DB_LOG, '...transaction failed, rolling back!')
      throw err
    }
  },
}

const getQueryPromise = (): ((options: string, values: any, callback?: queryCallback) => Promise<any>) =>
  util.promisify(Connection.get().query)

export const database2 = {
  query: (sql: string, params: any[] = [], logSQL = true): any =>
    getQueryPromise()
      .call(Connection.get(), sql, params)
      .then(value => {
        Logger(LOGS.DB_LOG, `${toLine(`${logSQL ? `${sql} [${params}]` : '-'}; OK`)}`)
        return value
      }, reason => {
        const message = `${toLine(`${logSQL ? `${sql} [${params}]` : '-'}; (${reason.message})`)}`
        Logger(LOGS.DB_LOG, message)
        Logger(LOGS.ERROR_LOG, message)
        handleConnectionError(reason, 'Query')
        return null
      }),
  withTransaction: async<T> (func: () => Promise<T>): Promise<T | null> => {
    try {
      Logger(LOGS.DB_LOG, 'Beginning transaction...')
      Connection.get().beginTransaction()
      const result = await func()
      if (!result) {
        Logger(LOGS.DB_LOG, '...transaction failed, rolling back!')
        Connection.get().rollback()
        return null
      }
      Connection.get().commit()
      Logger(LOGS.DB_LOG, '...transaction finished.')
      return result
    } catch (err) {
      Logger(LOGS.DB_LOG, '...transaction failed, rolling back!')
      Connection.get().rollback()
      return null
    }
  },
  beginTransaction: Connection.get().beginTransaction,
  commit: Connection.get().commit,
  rollback: Connection.get().rollback,
  end: Connection.get().end,
}
