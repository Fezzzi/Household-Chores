import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Save } from '@material-ui/icons'

import { useFormState, useUpdateHandler } from 'clientSrc/helpers/form'
import { DialogActions } from 'clientSrc/actions'
import { NotificationGroupBox, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBox, TableHeaderBox, TableHeaderCell } from 'clientSrc/styles/blocks/table'
import { INPUT_TYPE } from 'shared/constants'
import { COMMON, FORM } from 'shared/constants/localeMessages'
import { DIALOG_KEYS } from 'shared/constants/settingsDataKeys'

import { LocaleText, Input, PrimaryButton } from '../../common'
import { SimpleFloatingElement } from '../../portals'

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

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={<Save />}
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
        <PrimaryButton margin="14px 50px" inline>
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
          {dialogSettings && Object.entries(dialogSettings).map(([name, value]) => name !== DIALOG_KEYS.TUTORIAL && (
            <Input
              key={name}
              type={INPUT_TYPE.BOOL}
              name={name}
              label={`form.${name}`}
              value={!value}
              hasDefaultValue
              onUpdate={useUpdateHandler(setFormState)}
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
