import { apify } from 'serverSrc/helpers/api'

import { database } from './database'
import { tDialogsName, tDialogsCols, TDialogsType } from './tables'

export type DialogSettingsColumn = keyof Omit<TDialogsType, typeof tDialogsCols.user_id>
export const dialogSettingsColumns = Object.values(tDialogsCols).filter(col => col !== tDialogsCols.user_id)
export const isDialogColumnKey = (key: string): key is DialogSettingsColumn =>
  key in dialogSettingsColumns

export const disableDialog = (dialogColumn: DialogSettingsColumn, userId: number) =>
  database.queryBool(`
    UPDATE ${tDialogsName} SET ${dialogColumn}=1
    WHERE ${tDialogsCols.user_id}=${userId}
  `)

export const updateDialogSettings = (data: Record<DialogSettingsColumn, boolean>, userId: number) =>
  database.queryBool(`
    UPDATE ${tDialogsName}
    SET ${Object.entries(data).map(([name, value]) => `${name}=${value}`).join(', ')}
    WHERE ${tDialogsCols.user_id}=${userId}
  `)

export const getDialogSettings = (userId: number) =>
  apify(database.query<Record<DialogSettingsColumn, boolean>>(`
    SELECT ${Object.values(tDialogsCols).filter(key => key !== tDialogsCols.user_id).join(', ')}
    FROM ${tDialogsName}
    WHERE ${tDialogsCols.user_id}=${userId}
    LIMIT 1
  `))
