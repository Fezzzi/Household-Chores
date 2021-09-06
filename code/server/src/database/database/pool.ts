import pg from 'pg'
import dotenv from 'dotenv'

import { Logger } from '../../helpers/logger'
import { CONFIG, LOGS } from '../../constants'

dotenv.config()

const dbConfig = {
  connectionString: CONFIG.DATABASE_URL,
  ssl: CONFIG.DATABASE_SSL && {
    rejectUnauthorized: false,
  },
}

export class Pool {
  private static _pool: pg.Pool | null = null

  static get(): pg.Pool {
    if (this._pool === null) {
      this._pool = new pg.Pool(dbConfig)

      this._pool.on('error', async err => {
        Logger(LOGS.DB_LOG, `FATAL ERROR (${err.name}) [${err.message}] - Resetting pool...\n`)
        await this._pool!.end()
        this._pool = new pg.Pool(dbConfig)
      })
    }

    return this._pool
  }

  static async reset() {
    if (!this._pool === null) {
      await this._pool!.end()
      this._pool = new pg.Pool(dbConfig)
    }
  }
}
