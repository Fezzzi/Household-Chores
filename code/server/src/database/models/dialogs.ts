import { database } from '..'
import { tDialogsName, tDialogsCols } from './tables'
import { apify } from 'serverSrc/helpers/api'

export const disableDialog = async (userId: number, dialog: string): Promise<Array<number>> =>
  database.query(`
    UPDATE ${tDialogsName} SET ${dialog}=1
    WHERE ${tDialogsCols.id_user}=${userId}
  `)

export const updateDialogSettings = async (userId: number, data: Record<string, number>): Promise<boolean> =>
  database.query(`
    UPDATE ${tDialogsName}
    SET ${Object.entries(data).map(([name, value]) => `${name}=${value}`).join(', ')}
    WHERE ${tDialogsCols.id_user}=${userId}
  `)

export const getDialogSettings = async (userId: number): Promise<Record<string, boolean>> => {
  const settings = await apify<boolean>(database.query(`
    SELECT ${Object.values(tDialogsCols).filter(key => key !== tDialogsCols.id_user).join(', ')}
    FROM ${ tDialogsName }
    WHERE ${ tDialogsCols.id_user }=${ userId }
    LIMIT 1
  `))

  return settings[0]
}
