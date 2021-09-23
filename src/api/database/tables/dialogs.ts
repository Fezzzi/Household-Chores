export const tDialogsName = 'dialogs'
export const tDialogsCols = {
  user_id: 'user_id',
  tutorial: 'tutorial',
  household_member_deleting: 'household_member_deleting',
} as const

export interface TDialogsType {
  [tDialogsCols.user_id]: number
  [tDialogsCols.tutorial]: boolean
  [tDialogsCols.household_member_deleting]: boolean
}
