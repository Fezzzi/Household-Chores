import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { HighlightOff } from '@material-ui/icons'

import { ModalActions } from 'clientSrc/actions'
import { useFormState } from 'clientSrc/helpers/form'
import { UserName } from 'clientSrc/styles/blocks/households'
import { FormHeaderPhoto } from 'clientSrc/styles/blocks/form'
import {
  InvitationAcceptModalFields, ModalBody, ModalButtonsBlock, ModalCloseButton, ModalHeadline, ModalOverlay,
} from 'clientSrc/styles/blocks/modals'
import { COMMON, FORM } from 'shared/constants/localeMessages'

import { PrimaryButton, LocaleText, EditablePhotoField, EditableTextField } from '../common'

const InvitationAcceptModal = ({ data: { userName, userPhoto, onSubmit } }) => {
  const {
    isFormValid,
    inputs,
    errors,
    setFormState,
  } = useFormState([])

  const { name, photo } = inputs

  const dispatch = useDispatch()
  const closeModal = useCallback(() => dispatch(ModalActions.closeModal()), [dispatch])

  const handleConfirm = useCallback(() => {
    closeModal()
    onSubmit(name, photo)
  }, [name, photo])

  return (
    <ModalOverlay>
      <ModalBody>
        <ModalCloseButton onClick={closeModal}><HighlightOff /></ModalCloseButton>
        <ModalHeadline>
          <LocaleText message={FORM.SET_ALIAS} />
        </ModalHeadline>

        <InvitationAcceptModalFields>
          <EditablePhotoField
            name="photo"
            error={errors.photo}
            setFormState={setFormState}
          >
            <FormHeaderPhoto src={photo ?? userPhoto} />
          </EditablePhotoField>
          <UserName>
            <EditableTextField
              name="name"
              edited={name}
              placeholder={userName}
              error={errors.name}
              setFormState={setFormState}
            >
              {name ?? userName}
            </EditableTextField>
          </UserName>
        </InvitationAcceptModalFields>

        <ModalButtonsBlock>
          <PrimaryButton onClick={handleConfirm} disabled={!isFormValid} margin="20px 0 0">
            <LocaleText message={COMMON.CONFIRM} />
          </PrimaryButton>
        </ModalButtonsBlock>
      </ModalBody>
    </ModalOverlay>
  )
}

InvitationAcceptModal.propTypes = {
  data: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
}

export default InvitationAcceptModal