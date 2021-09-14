import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { COMMON, FORM } from 'shared/constants/localeMessages'
import { CloseIcon } from 'clientSrc/styles/icons'
import { UserName } from 'clientSrc/styles/blocks/households'
import { FormHeaderPhoto } from 'clientSrc/styles/blocks/form'
import {
  InvitationAcceptModalFields, ModalBody, ModalButtonsBlock, ModalCloseButton, ModalHeadline, ModalOverlay,
} from 'clientSrc/styles/blocks/modals'
import { ModalActions } from 'clientSrc/actions'
import { useFormState } from 'clientSrc/helpers/form'

import { PrimaryButton, LocaleText, EditablePhotoField, EditableTextField } from '../common'

const InvitationAcceptModal = ({ data: { userNickname, userPhoto, onSubmit } }) => {
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
        <ModalCloseButton onClick={closeModal}><CloseIcon /></ModalCloseButton>
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
              placeholder={userNickname}
              error={errors.name}
              setFormState={setFormState}
            >
              {name ?? userNickname}
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
    userNickname: PropTypes.string.isRequired,
    userPhoto: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
}

export default InvitationAcceptModal
