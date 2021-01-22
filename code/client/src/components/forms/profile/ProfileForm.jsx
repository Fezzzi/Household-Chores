import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Save } from '@material-ui/icons'
import PropTypes from 'prop-types'

import { useFormState, useUpdateHandler } from 'clientSrc/helpers/form'
import { useOpenConfirmationDialog } from 'clientSrc/helpers/confirmations'
import { FormWrapper, BottomFormButton, FormBody } from 'clientSrc/styles/blocks/settings'
import { INPUT_TYPE, USER_VISIBILITY_TYPE } from 'shared/constants'
import { COLORS, SUBMIT_TIMEOUT } from 'clientSrc/constants'
import { SettingsActions } from 'clientSrc/actions'
import { COMMON, FORM, HINT } from 'shared/constants/localeMessages'
import { PROFILE } from 'shared/constants/mappingKeys'

import { SimpleFloatingElement } from '../../portals'
import ProfileFormHeader from './ProfileFormHeader'
import { Input, LocaleText, PrimaryButton } from '../../common'

const ProfileForm = ({ data, onSubmit }) => {
  const [headerKey, setHeaderKey] = useState(0)
  const {
    submitMessage,
    isFormValid,
    isFormSending,
    inputs,
    errors,
    setFormState,
  } = useFormState([data])

  useEffect(() => {
    setHeaderKey(prevState => prevState + 1)
  }, [data])

  const {
    [PROFILE.PHOTO]: photo,
    [PROFILE.NAME]: name,
    [PROFILE.EMAIL]: email,
    [PROFILE.CONNECTION_VISIBILITY]: visibility,
  } = data

  const [timer, setTimer] = useState(null)
  useEffect(() => () => timer && clearTimeout(timer), [])

  const dispatch = useDispatch()
  const handleAccountDeletion = useCallback(() => {
    setFormState(prevState => ({
      ...prevState,
      isFormSending: true,
    }))
    setTimer(setTimeout(
      () => setFormState && setFormState(prevState => ({
        ...prevState,
        isFormSending: false,
      })), SUBMIT_TIMEOUT))
    dispatch(SettingsActions.deleteAccount())
  }, [setFormState, dispatch])

  const openConfirmationDialog = useOpenConfirmationDialog()

  return (
    <FormWrapper>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={<Save />}
          onClick={() => onSubmit(inputs, setFormState)}
        />
      )}
      <ProfileFormHeader
        key={`profileFormHeader-${headerKey}`}
        photo={photo}
        name={name}
        email={email}
        inputs={inputs}
        errors={errors}
        setFormState={setFormState}
      />

      <FormBody>
        <Input
          name={PROFILE.CONNECTION_VISIBILITY}
          type={INPUT_TYPE.SWITCH}
          label={FORM.USER_VISIBILITY}
          hint={HINT.VISIBILITY}
          values={[USER_VISIBILITY_TYPE.FOF, USER_VISIBILITY_TYPE.ALL]}
          value={visibility}
          hasDefaultValue
          onUpdate={useUpdateHandler(setFormState)}
        />
      </FormBody>

      <BottomFormButton>
        <PrimaryButton
          disabled={isFormSending}
          onClick={() => openConfirmationDialog(handleAccountDeletion, null, COMMON.CANT_UNDO)}
          background={COLORS.RED_PRIMARY}
          backgroundHover={COLORS.RED_SECONDARY}
        >
          <LocaleText message={FORM.DELETE_ACCOUNT} />
        </PrimaryButton>
      </BottomFormButton>
    </FormWrapper>
  )
}

ProfileForm.propTypes = {
  data: PropTypes.shape({
    [PROFILE.PHOTO]: PropTypes.string,
    [PROFILE.NAME]: PropTypes.string,
    [PROFILE.EMAIL]: PropTypes.string,
    [PROFILE.CONNECTION_VISIBILITY]: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ProfileForm
