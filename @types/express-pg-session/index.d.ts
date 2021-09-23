declare module 'express-pg-session' {
  import { session, Store } from 'express-session'
  import { Pool } from 'pg'

  export interface PGSessionOptions {
    conString?: string
    pool?: Pool
  }

  export type PGSessionIface = new(options?: PGSessionOptions) => PGSession

  export class PGSession extends Store {
    constructor (options?: PGSessionOptions)
  }

  export default function (s: typeof session): PGSessionIface
}
