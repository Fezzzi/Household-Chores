import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { INPUT_TYPE, USER_VISIBILITY_TYPE } from 'shared/constants'
import { COMMON, FORM, HINT } from 'shared/constants/localeMessages'
import { COLORS, SUBMIT_TIMEOUT } from 'web/constants'
import { SaveIcon } from 'web/styles/icons'
import { FormWrapper, BottomFormButton, FormBody } from 'web/styles/blocks/settings'
import { SettingsActions } from 'web/actions'
import { useOpenConfirmationDialog } from 'web/helpers/confirmations'
import { useFormState, useUpdateHandler } from 'web/helpers/form'

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
    photo,
    nickname,
    email,
    visibility,
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
          icon={SaveIcon}
          onClick={() => onSubmit(inputs, setFormState)}
        />
      )}
      <ProfileFormHeader
        key={`profileFormHeader-${headerKey}`}
        photo={photo}
        nickname={nickname}
        email={email}
        inputs={inputs}
        errors={errors}
        setFormState={setFormState}
      />

      <FormBody>
        <Input
          name="visibility"
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
    photo: PropTypes.string,
    nickname: PropTypes.string,
    email: PropTypes.string,
    visibility: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ProfileForm
