declare module 'express-pg-session' {
  import { session, Store } from 'express-session'

  export interface PGSessionOptions {
    conString?: string
  }

  export interface PGSessionIface {
    new(options?: PGSessionOptions): PGSession
  }

  export class PGSession extends Store {
    constructor (options?: PGSessionOptions)
  }

  export default function (s: typeof session): PGSessionIface
}
