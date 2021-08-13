import { GeneralEditInputs } from 'serverSrc/actions/settings/types'

import { tConnectionsCols, TConnectionsType, tUsersCols, TUsersType } from '../tables'
import { fMutualConnectionsOut, FMutualConnectionsType } from '../functions'

export type UserEditDbType = {
  [tUsersCols.nickname]?: GeneralEditInputs['nickname']
  [tUsersCols.email]?: GeneralEditInputs['email']
  [tUsersCols.password]?: string
  [tUsersCols.photo]?: string
  [tUsersCols.visibility]: GeneralEditInputs['visibility']
}

export const mapFromUserEditApiType = (userDdata: GeneralEditInputs, newPhoto?: string, newPass?: string): UserEditDbType => ({
  [tUsersCols.nickname]: userDdata.nickname,
  [tUsersCols.email]: userDdata.email,
  [tUsersCols.password]: newPass,
  [tUsersCols.photo]: newPhoto,
  [tUsersCols.visibility]: userDdata.visibility,
})

export type UserDataApiType = {
  userId: TUsersType[typeof tUsersCols.id]
  nickname: TUsersType[typeof tUsersCols.nickname]
  fsKey: TUsersType[typeof tUsersCols.fs_key]
  locale: TUsersType[typeof tUsersCols.locale]
}

export type UserDataDbType = Pick<TUsersType,
  typeof tUsersCols.id | typeof tUsersCols.nickname | typeof tUsersCols.locale | typeof tUsersCols.fs_key
>

export const mapToUserDataApiType = (userData: UserDataDbType): UserDataApiType => ({
  userId: userData[tUsersCols.id],
  nickname: userData[tUsersCols.nickname],
  fsKey: userData[tUsersCols.fs_key],
  locale: userData[tUsersCols.locale],
})

export type UserQueryDbType = Pick<FMutualConnectionsType, typeof fMutualConnectionsOut.mutual_connections>
  & Pick<TUsersType, typeof tUsersCols.id | typeof tUsersCols.nickname | typeof tUsersCols.photo | typeof tUsersCols.visibility>
  & Pick<TConnectionsType, typeof tConnectionsCols.message | typeof tConnectionsCols.state>

export type UserQueryApiType = {
  mutualConnections: UserQueryDbType[typeof fMutualConnectionsOut.mutual_connections]
  userId: UserQueryDbType[typeof tUsersCols.id]
  nickname: UserQueryDbType[typeof tUsersCols.nickname]
  photo: UserQueryDbType[typeof tUsersCols.photo]
  visibility: UserQueryDbType[typeof tUsersCols.visibility]
  message: UserQueryDbType[typeof tConnectionsCols.message]
  state: UserQueryDbType[typeof tConnectionsCols.state]
}

export const mapToUserQueryApiType = (user: UserQueryDbType): UserQueryApiType => ({
  mutualConnections: user[fMutualConnectionsOut.mutual_connections],
  userId: user[tUsersCols.id],
  nickname: user[tUsersCols.nickname],
  photo: user[tUsersCols.photo],
  visibility: user[tUsersCols.visibility],
  message: user[tConnectionsCols.message],
  state: user[tConnectionsCols.state],
})

export type UserProfileDbType = Pick<TUsersType,
  typeof tUsersCols.id | typeof tUsersCols.nickname | typeof tUsersCols.email
  | typeof tUsersCols.photo | typeof tUsersCols.visibility | typeof tUsersCols.locale
>

export type UserProfileApiType = {
  userId: UserProfileDbType[typeof tUsersCols.id]
  nickname: UserProfileDbType[typeof tUsersCols.nickname]
  email: UserProfileDbType[typeof tUsersCols.email]
  photo: UserProfileDbType[typeof tUsersCols.photo]
  visibility: UserProfileDbType[typeof tUsersCols.visibility]
  locale: UserProfileDbType[typeof tUsersCols.locale]
}

export const mapToUserProfileApiType = (user: UserProfileDbType): UserProfileApiType => ({
  userId: user[tUsersCols.id],
  nickname: user[tUsersCols.nickname],
  email: user[tUsersCols.email],
  photo: user[tUsersCols.photo],
  visibility: user[tUsersCols.visibility],
  locale: user[tUsersCols.locale],
})
