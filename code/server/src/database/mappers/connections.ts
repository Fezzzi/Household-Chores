import { tConnectionsCols, TConnectionsType, tUsersCols, TUsersType } from 'serverSrc/database/tables'
import { fMutualConnectionsOut, FMutualConnectionsType } from 'serverSrc/database/functions'

export type ApprovedConnectionDbType = Pick<TUsersType,
    typeof tUsersCols.id | typeof tUsersCols.nickname | typeof tUsersCols.photo
  >
  & Pick<TConnectionsType, typeof tConnectionsCols.date_created>

export type ApprovedConnectionApiType = {
  userId: ApprovedConnectionDbType[typeof tUsersCols.id]
  nickname: ApprovedConnectionDbType[typeof tUsersCols.nickname]
  photo: ApprovedConnectionDbType[typeof tUsersCols.photo]
  dateCreated: ApprovedConnectionDbType[typeof tConnectionsCols.date_created]
}

export const mapToApprovedConnectionApiType = (connection: ApprovedConnectionDbType): ApprovedConnectionApiType => ({
  userId: connection[tUsersCols.id],
  nickname: connection[tUsersCols.nickname],
  photo: connection[tUsersCols.photo],
  dateCreated: connection[tConnectionsCols.date_created],
})

export type ConnectionDbType = Pick<FMutualConnectionsType, typeof fMutualConnectionsOut.mutual_connections>
  & Pick<TUsersType, typeof tUsersCols.id | typeof tUsersCols.nickname | typeof tUsersCols.photo>
  & Pick<TConnectionsType, typeof tConnectionsCols.message | typeof tConnectionsCols.state | typeof tConnectionsCols.date_created>

export type ConnectionApiType = {
  mutualConnections: ConnectionDbType[typeof fMutualConnectionsOut.mutual_connections]
  userId: ConnectionDbType[typeof tUsersCols.id]
  nickname: ConnectionDbType[typeof tUsersCols.nickname]
  photo: ConnectionDbType[typeof tUsersCols.photo]
  message: ConnectionDbType[typeof tConnectionsCols.message]
  state: ConnectionDbType[typeof tConnectionsCols.state]
  dateCreated: ConnectionDbType[typeof tConnectionsCols.date_created]
}

export const mapToConnectionApiType = (connection: ConnectionDbType): ConnectionApiType => ({
  mutualConnections: connection[fMutualConnectionsOut.mutual_connections],
  userId: connection[tUsersCols.id],
  nickname: connection[tUsersCols.nickname],
  photo: connection[tUsersCols.photo],
  message: connection[tConnectionsCols.message],
  state: connection[tConnectionsCols.state],
  dateCreated: connection[tConnectionsCols.date_created],
})
