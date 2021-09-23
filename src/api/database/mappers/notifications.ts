import { apifyObject, deApifyObject, SnakeCaseObjectToCamelCase } from 'api/helpers/api'

import { tNotifySettingsCols, TNotifySettingsType, tUsersCols, TUsersType } from '../tables'

export type NotifySettingsDbType = Omit<TNotifySettingsType, typeof tNotifySettingsCols.user_id>
export type NotifySettingsUnforcedDbType = { [key in keyof NotifySettingsDbType]?: NotifySettingsDbType[key] }

export type NotifySettingsApiType = SnakeCaseObjectToCamelCase<NotifySettingsDbType>
export type NotifySettingsUnforcedApiType = { [key in keyof NotifySettingsApiType]?: NotifySettingsApiType[key] }

export const mapToNotifySettingsApiType = (settings: NotifySettingsDbType): NotifySettingsApiType =>
  apifyObject(settings)

export const mapFromNotifySettingsUnforcedApiType = (settings: NotifySettingsUnforcedApiType): NotifySettingsUnforcedDbType =>
  deApifyObject(settings)

export type NotifyDataDbType = TNotifySettingsType & {
  [tUsersCols.email]: TUsersType[typeof tUsersCols.email]
}

export const mapToNotifyDataApiType = (data: NotifyDataDbType): SnakeCaseObjectToCamelCase<NotifyDataDbType> =>
  apifyObject(data)
