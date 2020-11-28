import mysql, { MysqlError } from 'mysql'
import dotenv from 'dotenv'

import { Logger } from '../helpers/logger'
import { LOGS } from '../constants'

dotenv.config()

const FATAL_ERROR_CODES = [
  'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR',
  'PROTOCOL_CONNECTION_LOST',
]

const config: object = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}

export const handleConnectionError = (err: MysqlError | null, type: string) => {
  if (err && (err.fatal || FATAL_ERROR_CODES.find(code => err.code === code))) {
    Logger(LOGS.DB_LOG, `FATAL ERROR (${type}) [${err.message}] - Resetting connection...\n`)
    Connection.reset()
  }
}

export class Connection {
  private static __connection: mysql.Connection|null = null;

  private static __createConnection = () => mysql
    .createConnection(config)
    .on('error', err => handleConnectionError(err, 'Connection'));

  static get() {
    if (this.__connection === null) {
      this.__connection = this.__createConnection()
    }
    return this.__connection
  }

  static reset() {
    if (this.__connection === null) {
      return
    }
    this.__connection.destroy()
    this.__connection = this.__createConnection()
  }
}

export const pool = mysql.createPool(config)
