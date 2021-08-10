import { USER_VISIBILITY_TYPE } from 'shared/constants'

export const tUsersName = 'users'
export const tUsersCols = {
  id: 'id',
  google_id: 'google_id',
  facebook_id: 'facebook_id',
  email: 'email',
  nickname: 'nickname',
  password: 'password',
  photo: 'photo',
  confirmed: 'confirmed',
  visibility: 'visibility',
  date_registered: 'date_registered',
  date_last_active: 'date_last_active',
  fs_key: 'file_system_key',
  locale: 'locale',
} as const

export interface TUsersType {
  [tUsersCols.id]: number
  [tUsersCols.google_id]: number | null
  [tUsersCols.facebook_id]: number | null
  [tUsersCols.email]: string
  [tUsersCols.nickname]: string
  [tUsersCols.password]: string
  [tUsersCols.photo]: string | null
  [tUsersCols.confirmed]: boolean
  [tUsersCols.visibility]: typeof USER_VISIBILITY_TYPE.FOF | typeof USER_VISIBILITY_TYPE.ALL
  [tUsersCols.date_registered]: Date
  [tUsersCols.date_last_active]: Date | null
  [tUsersCols.fs_key]: string
  [tUsersCols.locale]: string
}
