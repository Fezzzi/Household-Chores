import { GeneralEditInputs } from 'serverSrc/actions/settings/types'

import { tUsersCols, TUsersType } from '../tables'

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

export type UserDataDbType = Pick<
  TUsersType,
  typeof tUsersCols.id | typeof tUsersCols.nickname | typeof tUsersCols.locale | typeof tUsersCols.fs_key
>

export const mapToUserDataApiType = (userData: UserDataDbType): UserDataApiType => ({
  userId: userData[tUsersCols.id],
  nickname: userData[tUsersCols.nickname],
  fsKey: userData[tUsersCols.fs_key],
  locale: userData[tUsersCols.locale],
})
