import { DIALOG_KEYS } from 'shared/constants/settingsDataKeys'

import { database } from '..'
import { tDialogsName, tDialogsCols } from './tables'

export const disableDialog = async (userId: number, dialog: string): Promise<Array<number>> => {
  const dialogColumn = dialog === DIALOG_KEYS.TUTORIAL
    ? tDialogsCols.tutorial
    : tDialogsCols.household_user_deleting

  return database.query(`
    UPDATE ${tDialogsName} SET ${dialogColumn}=1
  `)
}
