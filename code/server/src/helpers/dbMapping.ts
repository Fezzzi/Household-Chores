import { tDialogsCols } from 'serverSrc/database/models/tables'
import { DIALOG_KEYS } from 'shared/constants/mappingKeys'

const dialogKeyMapping = {
  [DIALOG_KEYS.TUTORIAL]: tDialogsCols.tutorial,
  [DIALOG_KEYS.HOUSEHOLD_MEMBER_DELETING]: tDialogsCols.household_user_deleting,
}
const dialogDbMapping = Object.fromEntries(Object.entries(dialogKeyMapping).map(([name, value]) => [value, name]))

export const mapToDialogKey = (key: string): string => dialogDbMapping[key]
export const mapFromDialogKey = (key: string): string => dialogKeyMapping[key]

export const mapData = (data: Record<string, any>, mappingFunc: (key: string) => string): Record<string, any> =>
  Object.fromEntries(
    Object.entries(data)
      .map(([key, value]) => [mappingFunc(key), value])
      .filter(([name]) => Boolean(name))
  )
