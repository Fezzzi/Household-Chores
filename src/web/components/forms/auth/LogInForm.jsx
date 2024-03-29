import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { PropTypes } from 'prop-types'

import { INPUT_TYPE, NOTIFICATION_TYPE } from 'shared/constants'
import { AUTH, COMMON, FORM } from 'shared/constants/localeMessages'
import { AuthActions, NotificationActions } from 'web/actions'
import { LinkRow } from 'web/styles/blocks/auth'
import { useFormState, useUpdateHandler, useSubmitHandler, useFormValidOnFilled } from 'web/helpers/form'
import { AUTH_TABS } from 'web/constants'

import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'
import { LocaleText, PrimaryButton } from '../../common'
import { TextInput } from '../../common/inputs'
import Separator from '../Separator'

const inputConfig = [
  { name: 'email', value: FORM.EMAIL, type: INPUT_TYPE.EMAIL },
  { name: 'password', value: FORM.PASSWORD, type: INPUT_TYPE.PASSWORD },
]

const LogInForm = ({ switchTab }) => {
  const dispatch = useDispatch()
  const addNotification = useCallback((type, message) =>
    dispatch(NotificationActions.addNotifications({ [type]: [message] })),
  [dispatch])

  const {
    submitMessage,
    isFormValid,
    isFormSending,
    inputs,
    errors,
    setFormState,
  } = useFormState([], AUTH.LOG_IN, false)

  const handleError = error => addNotification(NOTIFICATION_TYPE.ERRORS, error.message)

  const formValidFunc = useFormValidOnFilled(inputConfig.map(input => input.name))
  const updateHandler = useUpdateHandler(setFormState, formValidFunc)
  const submitHandler = useSubmitHandler(AuthActions.logIn)
  const handleSubmit = () => submitHandler(inputs, setFormState, AUTH.LOG_IN, COMMON.SENDING)

  return (
    <form method="post">
      {inputConfig.map(input => (
        <TextInput
          name={input.name}
          key={input.name}
          value={input.value}
          type={input.type}
          fixedPadding
          inputError={errors[input.name] || ''}
          onUpdate={updateHandler}
        />
      ))}
      <PrimaryButton disabled={!isFormValid || isFormSending} onClick={handleSubmit}>
        <LocaleText message={submitMessage} />
      </PrimaryButton>
      <Separator message={COMMON.OR} />
      <FacebookLoginButton onError={handleError} />
      <GoogleLoginButton onError={handleError} />
      <LinkRow onClick={() => switchTab(AUTH_TABS.RESET_TAB)}>
        <LocaleText message={AUTH.FORGOT_PASS} />
      </LinkRow>
    </form>
  )
}

LogInForm.propTypes = {
  switchTab: PropTypes.func.isRequired,
}

export default LogInForm
