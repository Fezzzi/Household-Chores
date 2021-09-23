import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { INPUT_TYPE } from 'shared/constants'
import { COMMON } from 'shared/constants/localeMessages'

import { COLORS } from '../../constants'
import { CloseIcon } from '../../styles/icons'
import {
  ModalBody, ModalButtonsBlock, ModalCloseButton, ModalHeadline, ModalMessage, ModalNote, ModalOverlay,
} from '../../styles/blocks/modals'
import { DialogActions, ModalActions } from '../../actions'
import { PrimaryButton, Input, LocaleText } from '../common'

const ConfirmationModal = ({ data: { message, onSubmit, disableableKey } }) => {
  const [disabled, setDisabled] = useState(false)

  const dispatch = useDispatch()
  const closeModal = useCallback(() => dispatch(ModalActions.closeModal()), [dispatch])
  const handleDisabling = useCallback(() =>
    disableableKey && dispatch(DialogActions.disableDialog(disableableKey)),
  [disableableKey, dispatch])

  const handleConfirm = () => {
    if (disabled !== false) {
      handleDisabling()
    }
    closeModal()
    onSubmit()
    return null
  }

  const dialogSettings = useSelector(({ dialogs }) => dialogs)
  const dialogDisabled = useMemo(() => dialogSettings[disableableKey], [disableableKey, dialogSettings])

  if (dialogDisabled) {
    handleConfirm()
    return null
  }

  return !dialogDisabled && (
    <ModalOverlay>
      <ModalBody>
        <ModalCloseButton onClick={closeModal}><CloseIcon /></ModalCloseButton>
        <ModalHeadline>
          <LocaleText message={COMMON.ARE_YOU_SURE} />
        </ModalHeadline>
        <ModalMessage>
          <LocaleText message={message} />
        </ModalMessage>

        {!!disableableKey && (
          <ModalNote>
            <Input
              name="askAgain"
              type={INPUT_TYPE.BOOL}
              value={disabled}
              onUpdate={() => setDisabled(prevState => !prevState)}
              label={COMMON.DONT_ASK_AGAIN}
              alignLeft
              isSmall
            />
          </ModalNote>
        )}
        <ModalButtonsBlock>
          <PrimaryButton onClick={handleConfirm}>
            <LocaleText message={COMMON.CONFIRM} />
          </PrimaryButton>
          <PrimaryButton
            onClick={closeModal}
            background={COLORS.LIGHT_PRIMARY}
            backgroundHover={COLORS.LIGHT_SECONDARY}
            color={COLORS.FONT}
          >
            <LocaleText message={COMMON.CANCEL} />
          </PrimaryButton>
        </ModalButtonsBlock>
      </ModalBody>
    </ModalOverlay>
  )
}

ConfirmationModal.propTypes = {
  data: PropTypes.shape({
    message: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    disableableKey: PropTypes.string,
  }).isRequired,
}

export default ConfirmationModal
