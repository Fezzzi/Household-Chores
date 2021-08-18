import { apifyObject, deApifyObject, SnakeCaseObjectToCamelCase } from 'serverSrc/helpers/api'

import { tNotifySettingsCols, TNotifySettingsType } from '../tables'

export type NotifySettingsDbType = Omit<TNotifySettingsType, typeof tNotifySettingsCols.user_id>
export type NotifySettingsUnforcedDbType = { [key in keyof NotifySettingsDbType]?: NotifySettingsDbType[key] }

export type NotifySettingsApiType = SnakeCaseObjectToCamelCase<NotifySettingsDbType>
export type NotifySettingsUnforcedApiType = { [key in keyof NotifySettingsApiType]?: NotifySettingsApiType[key] }

export const mapToNotifySettingsApiType = (settings: NotifySettingsDbType): NotifySettingsApiType =>
  apifyObject(settings)

export const mapFromNotifySettingsUnforcedApiType = (settings: NotifySettingsUnforcedApiType): NotifySettingsUnforcedDbType =>
  deApifyObject(settings)

export const mapToNotifyDataApiType = (data: TNotifySettingsType): SnakeCaseObjectToCamelCase<TNotifySettingsType> =>
  apifyObject(data)
