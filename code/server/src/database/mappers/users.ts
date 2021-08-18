import { GeneralEditInputs } from 'serverSrc/actions/settings/types'
import { apifyObject, SnakeCaseObjectToCamelCase } from 'serverSrc/helpers/api'

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

export type UserDataDbType = Pick<TUsersType,
  typeof tUsersCols.user_id | typeof tUsersCols.nickname | typeof tUsersCols.locale | typeof tUsersCols.file_system_key
>

export type UserDataApiType = SnakeCaseObjectToCamelCase<Omit<UserDataDbType, typeof tUsersCols.file_system_key>> & {
  fsKey: TUsersType[typeof tUsersCols.file_system_key]
}

export const mapToUserDataApiType = ({ [tUsersCols.file_system_key]: fsKey, ...rest }: UserDataDbType): UserDataApiType => ({
  ...apifyObject(rest),
  fsKey,
})

export type UserQueryDbType = Pick<FMutualConnectionsType, typeof fMutualConnectionsOut.mutual_connections>
  & Pick<TUsersType, typeof tUsersCols.user_id | typeof tUsersCols.nickname | typeof tUsersCols.photo | typeof tUsersCols.visibility>
  & Pick<TConnectionsType, typeof tConnectionsCols.message | typeof tConnectionsCols.state>

export type UserQueryApiType = SnakeCaseObjectToCamelCase<UserQueryDbType>

export const mapToUserQueryApiType = (user: UserQueryDbType): UserQueryApiType =>
  apifyObject(user)

export type UserProfileDbType = Pick<TUsersType,
  typeof tUsersCols.user_id | typeof tUsersCols.nickname | typeof tUsersCols.email
  | typeof tUsersCols.photo | typeof tUsersCols.visibility | typeof tUsersCols.locale
>

export type UserProfileApiType = SnakeCaseObjectToCamelCase<UserProfileDbType>

export const mapToUserProfileApiType = (user: UserProfileDbType): UserProfileApiType =>
  apifyObject(user)
