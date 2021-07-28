declare module 'express-pg-session' {
  import { Session, Store } from 'express-session'

  export interface PGSessionIface {
    new(options: any): PGSession
  }

  export class PGSession extends Store {
    constructor (options: any)
  }

  export default function (session: Session): PGSessionIface
}
