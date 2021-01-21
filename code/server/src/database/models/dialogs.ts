import { mapData, mapFromDialogKey, mapToDialogKey } from 'serverSrc/helpers/dbMapping'

import { database } from '..'
import { tDialogsName, tDialogsCols } from './tables'

export const disableDialog = async (userId: number, dialog: string): Promise<Array<number>> => {
  const dialogColumn = mapFromDialogKey(dialog)

  return database.query(`
    UPDATE ${tDialogsName} SET ${dialogColumn}=1
    WHERE ${tDialogsCols.id_user}=${userId}
  `)
}

export const updateDialogSettings = async (userId: number, data: Record<string, number>): Promise<boolean> =>
  database.query(`
    UPDATE ${tDialogsName}
    SET ${Object.entries(data).map(([name, value]) => `${mapFromDialogKey(name)}=${value}`).join(', ')}
    WHERE ${tDialogsCols.id_user}=${userId}
  `)

export const getDialogSettings = async (userId: number): Promise<Record<string, boolean>> => {
  const settings = await database.query(`
    SELECT * FROM ${tDialogsName}
    WHERE ${tDialogsCols.id_user}=${userId}
    LIMIT 1
  `)

  return mapData(settings[0], mapToDialogKey)
}
