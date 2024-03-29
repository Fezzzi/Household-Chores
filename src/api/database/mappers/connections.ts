import { tConnectionsCols, TConnectionsType, tUsersCols, TUsersType } from 'api/database/tables'
import { fMutualConnectionsOut, FMutualConnectionsType } from 'api/database/functions'

export type ApprovedConnectionDbType =
  Pick<TUsersType, typeof tUsersCols.user_id | typeof tUsersCols.nickname | typeof tUsersCols.photo>
  & Pick<TConnectionsType, typeof tConnectionsCols.date_created>

export interface ApprovedConnectionApiType {
  userId: ApprovedConnectionDbType[typeof tUsersCols.user_id]
  nickname: ApprovedConnectionDbType[typeof tUsersCols.nickname]
  photo: ApprovedConnectionDbType[typeof tUsersCols.photo]
  dateCreated: ApprovedConnectionDbType[typeof tConnectionsCols.date_created]
}

export const mapToApprovedConnectionApiType = (connection: ApprovedConnectionDbType): ApprovedConnectionApiType => ({
  userId: connection[tUsersCols.user_id],
  nickname: connection[tUsersCols.nickname],
  photo: connection[tUsersCols.photo],
  dateCreated: connection[tConnectionsCols.date_created],
})

export type ConnectionDbType = Pick<FMutualConnectionsType, typeof fMutualConnectionsOut.mutual_connections>
  & Pick<TUsersType, typeof tUsersCols.user_id | typeof tUsersCols.nickname | typeof tUsersCols.photo>
  & Pick<TConnectionsType, typeof tConnectionsCols.message | typeof tConnectionsCols.state | typeof tConnectionsCols.date_created>

export interface ConnectionApiType {
  mutualConnections: ConnectionDbType[typeof fMutualConnectionsOut.mutual_connections]
  userId: ConnectionDbType[typeof tUsersCols.user_id]
  nickname: ConnectionDbType[typeof tUsersCols.nickname]
  photo: ConnectionDbType[typeof tUsersCols.photo]
  message: ConnectionDbType[typeof tConnectionsCols.message]
  state: ConnectionDbType[typeof tConnectionsCols.state]
  dateCreated: ConnectionDbType[typeof tConnectionsCols.date_created]
}

export const mapToConnectionApiType = (connection: ConnectionDbType): ConnectionApiType => ({
  mutualConnections: connection[fMutualConnectionsOut.mutual_connections],
  userId: connection[tUsersCols.user_id],
  nickname: connection[tUsersCols.nickname],
  photo: connection[tUsersCols.photo],
  message: connection[tConnectionsCols.message],
  state: connection[tConnectionsCols.state],
  dateCreated: connection[tConnectionsCols.date_created],
})
