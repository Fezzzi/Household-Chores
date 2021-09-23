import { apifyObject, deApifyObject, SnakeCaseObjectToCamelCase } from 'api/helpers/api'

import { tDialogsCols, TDialogsType } from '../tables'

export type UserDialogsDbType = Omit<TDialogsType, typeof tDialogsCols.user_id>
export type UserDialogsUnforcedDbType = { [key in keyof UserDialogsDbType]?: UserDialogsDbType[key] }

export type UserDialogsApiType = SnakeCaseObjectToCamelCase<UserDialogsDbType>
export type UserDialogsUnforcedApiType = { [key in keyof UserDialogsApiType]?: UserDialogsApiType[key] }

export const mapToUserDialogsApiType = (dialogs: UserDialogsDbType): UserDialogsApiType =>
  apifyObject(dialogs)

export const mapFromUserDialogsUnforcedApiType = (dialogs: UserDialogsUnforcedApiType): UserDialogsUnforcedDbType =>
  deApifyObject(dialogs)
