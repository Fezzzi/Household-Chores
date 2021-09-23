import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { COMMON } from 'shared/constants/localeMessages'

import { ModalActions } from '../actions'
import { MODAL_TYPE } from '../constants'

export const useOpenConfirmationDialog = () => {
  const dispatch = useDispatch()
  const dialogSettings = useSelector(({ dialogs }) => dialogs)

  return useCallback((onSubmit, disableableKey, message = COMMON.CANT_UNDO_SAVING) => {
    if (dialogSettings[disableableKey]) {
      onSubmit()
    } else {
      dispatch(ModalActions.openModal({
        type: MODAL_TYPE.CONFIRMATION,
        data: { message, onSubmit, disableableKey },
      }))
    }
  }, [dialogSettings, dispatch])
}
