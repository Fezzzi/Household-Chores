import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { HighlightOff } from '@material-ui/icons'

import {
  ModalBody, ModalButtonsBlock, ModalCloseButton, ModalOverlay,
} from 'clientSrc/styles/blocks/modals'
import { ModalActions } from 'clientSrc/actions'
import { COMMON } from 'shared/constants/localeMessages'
import { INPUT_TYPE } from 'shared/constants'

import { PrimaryButton, LocaleText, Input } from '../common'

const AppendMessageModal = ({ data: { minLength = 0, maxLength, onSubmit } }) => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  const dispatch = useDispatch()
  const closeModal = useCallback(() => dispatch(ModalActions.closeModal()), [dispatch])

  const handleInputUpdate = (_, isValid, newValue, errorMessage) => {
    setError(isValid
      ? null
      : (errorMessage ?? true)
    )
    setMessage(isValid ? newValue : '')
  }

  const handleConfirm = useCallback(() => {
    closeModal()
    onSubmit(message)
  }, [message])

  return (
    <ModalOverlay>
      <ModalBody>
        <ModalCloseButton onClick={closeModal}><HighlightOff /></ModalCloseButton>

        <Input
          type={INPUT_TYPE.TEXT_AREA}
          name="message"
          value={COMMON.MESSAGE}
          inputError={error}
          cols={45}
          rows={6}
          minLength={minLength}
          maxLength={maxLength}
          onUpdate={handleInputUpdate}
          showRemaining
        />

        <ModalButtonsBlock>
          <PrimaryButton onClick={handleConfirm} disabled={!!error} margin="14px 40px 0">
            <LocaleText message={COMMON.CONFIRM} />
          </PrimaryButton>
        </ModalButtonsBlock>
      </ModalBody>
    </ModalOverlay>
  )
}

AppendMessageModal.propTypes = {
  data: PropTypes.shape({
    minLength: PropTypes.number,
    maxLength: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
}

export default AppendMessageModal
