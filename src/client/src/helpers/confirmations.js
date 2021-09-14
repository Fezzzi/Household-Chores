import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ModalActions } from 'clientSrc/actions'
import { MODAL_TYPE } from 'clientSrc/constants'
import { COMMON } from 'shared/constants/localeMessages'

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
