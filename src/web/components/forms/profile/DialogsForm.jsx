import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { COMMON, FORM } from 'shared/constants/localeMessages'
import { INPUT_TYPE } from 'shared/constants'
import { MODAL_TYPE } from 'web/constants'
import { SaveIcon } from 'web/styles/icons'
import { DialogActions, ModalActions } from 'web/actions'
import { NotificationGroupBox, SectionHeadline } from 'web/styles/blocks/settings'
import { TableBox, TableHeaderBox, TableHeaderCell } from 'web/styles/blocks/table'
import { useFormState, useUpdateHandler } from 'web/helpers/form'

import { LocaleText, Input, PrimaryButton } from '../../common'
import { FloatingIcon } from '../../portals'

const DialogsForm = ({ onSubmit }) => {
  const dialogSettings = useSelector(({ dialogs }) => dialogs)
  const {
    submitMessage,
    isFormValid,
    isFormSending,
    inputs,
    setFormState,
  } = useFormState([dialogSettings])

  const dispatch = useDispatch()
  const handleSubmit = useCallback(() => {
    onSubmit(inputs, setFormState)
    dispatch(DialogActions.loadDialogSettings(inputs))
  }, [inputs, setFormState, dispatch])

  const openTutorialDialog = useCallback(() =>
    dispatch(ModalActions.openModal({ type: MODAL_TYPE.TUTORIAL })),
  [dispatch])

  const updateHandler = useUpdateHandler(setFormState)

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <FloatingIcon
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={SaveIcon}
          onClick={handleSubmit}
        />
      )}

      <SectionHeadline first>
        <LocaleText message={FORM.DIALOGS} />
      </SectionHeadline>

      <TableBox>
        <TableHeaderBox>
          <TableHeaderCell>
            <LocaleText message={FORM.TUTORIAL_DIALOG} />
          </TableHeaderCell>
        </TableHeaderBox>
        <PrimaryButton onClick={openTutorialDialog} margin="14px 50px" inline>
          <LocaleText message={COMMON.SHOW} />
        </PrimaryButton>
      </TableBox>
      <TableBox>
        <TableHeaderBox>
          <TableHeaderCell>
            <LocaleText message={FORM.CONFIRMATION_DIALOGS} />
          </TableHeaderCell>
        </TableHeaderBox>
        <NotificationGroupBox>
          {dialogSettings && Object.entries(dialogSettings).map(([name, value]) => name !== 'tutorial' && (
            <Input
              key={name}
              type={INPUT_TYPE.BOOL}
              name={name}
              label={`form.${name}`}
              value={value}
              hasDefaultValue
              onUpdate={updateHandler}
            />
          ))}
        </NotificationGroupBox>
      </TableBox>
    </>
  )
}

DialogsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default DialogsForm
