import { DIALOG_KEYS } from 'shared/constants/settingsDataKeys'

import { database } from '..'
import { tDialogsName, tDialogsCols } from './tables'

export const disableDialog = async (userId: number, dialog: string): Promise<Array<number>> => {
  const dialogColumn = dialog === DIALOG_KEYS.TUTORIAL
    ? tDialogsCols.tutorial
    : tDialogsCols.household_user_deleting

  return database.query(`
    UPDATE ${tDialogsName} SET ${dialogColumn}=1
    WHERE ${tDialogsCols.id_user}=${userId}
  `)
}

export const getDialogSettings = async (userId: number): Promise<Record<string, boolean>> => {
  const settings = await database.query(`
    SELECT * FROM ${tDialogsName}
    WHERE ${tDialogsCols.id_user}=${userId}
    LIMIT 1
  `)

  return {
    [DIALOG_KEYS.TUTORIAL]: !!settings[0][tDialogsCols.tutorial],
    [DIALOG_KEYS.HOUSEHOLD_USER_DELETING]: !!settings[0][tDialogsCols.household_user_deleting],
  }
}
