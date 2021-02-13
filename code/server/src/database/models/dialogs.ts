import { apify } from 'serverSrc/helpers/api'

import { database } from '..'
import { tDialogsName, tDialogsCols } from './tables'

export const disableDialog = async (dialog: string, userId: number): Promise<Array<number>> =>
  database.query(`
    UPDATE ${tDialogsName} SET ${dialog}=1
    WHERE ${tDialogsCols.id_user}=${userId}
  `)

export const updateDialogSettings = async (data: Record<string, number>, userId: number): Promise<boolean> =>
  database.query(`
    UPDATE ${tDialogsName}
    SET ${Object.entries(data).map(([name, value]) => `${name}=${value}`).join(', ')}
    WHERE ${tDialogsCols.id_user}=${userId}
  `)

export const getDialogSettings = async (userId: number): Promise<Record<string, boolean>> => {
  const settings = await apify<boolean>(database.query(`
    SELECT ${Object.values(tDialogsCols).filter(key => key !== tDialogsCols.id_user).join(', ')}
    FROM ${tDialogsName}
    WHERE ${tDialogsCols.id_user}=${userId}
    LIMIT 1
  `))

  return settings[0]
}
