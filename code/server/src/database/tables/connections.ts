import { CONNECTION_STATE_TYPE } from 'shared/constants/index'

export const tConnectionsName = 'connections'
export const tConnectionsCols = {
  from_id: 'from_id',
  to_id: 'to_id',
  message: 'message',
  state: 'state',
  date_created: 'date_created',
} as const

// todo: Refactor state's type after constants are in typescript
export interface TConnectionsType {
  [tConnectionsCols.from_id]: number
  [tConnectionsCols.to_id]: number
  [tConnectionsCols.message]: string | null
  [tConnectionsCols.state]: typeof CONNECTION_STATE_TYPE.APPROVED | typeof CONNECTION_STATE_TYPE.BLOCKED | typeof CONNECTION_STATE_TYPE.WAITING
  [tConnectionsCols.date_created]: string
}
