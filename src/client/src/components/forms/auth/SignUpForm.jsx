import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { INPUT_TYPE, NOTIFICATION_TYPE } from 'shared/constants'
import { AUTH, COMMON, FORM } from 'shared/constants/localeMessages'
import { AuthActions, NotificationActions } from 'clientSrc/actions'
import { MessageBlock, MessageBlockLink } from 'clientSrc/styles/blocks/auth'
import { useFormState, useFormValidOnFilled, useUpdateHandler, useSubmitHandler } from 'clientSrc/helpers/form'

import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'
import { PrimaryButton, LocaleText } from '../../common'
import { TextInput } from '../../common/inputs'
import Separator from '../Separator'

const inputConfig = [
  { name: 'email', message: FORM.EMAIL, type: INPUT_TYPE.EMAIL },
  { name: 'nickname', message: FORM.NICKNAME, type: INPUT_TYPE.TEXT },
  { name: 'password', message: FORM.PASSWORD, type: INPUT_TYPE.PASSWORD },
]

const SignUpForm = ({ showTaC }) => {
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
  } = useFormState([], AUTH.SIGN_UP, false)

  const handleError = error => addNotification(NOTIFICATION_TYPE.ERRORS, error.message)

  const formValidFunc = useFormValidOnFilled(inputConfig.map(input => input.name))
  const updateHandler = useUpdateHandler(setFormState, formValidFunc)
  const submitHandler = useSubmitHandler(AuthActions.signUp)
  const handleSubmit = () => submitHandler(inputs, setFormState, AUTH.SIGN_UP, COMMON.SENDING)

  return (
    <form method="post">
      <FacebookLoginButton onError={handleError} />
      <GoogleLoginButton onError={handleError} />
      <Separator message={COMMON.OR} />
      {inputConfig.map(input => (
        <TextInput
          name={input.name}
          key={input.name}
          value={input.message}
          type={input.type}
          fixedPadding
          inputError={errors[input.name] || ''}
          onUpdate={updateHandler}
        />
      ))}
      <PrimaryButton disabled={!isFormValid || isFormSending} onClick={handleSubmit}>
        <LocaleText message={submitMessage} />
      </PrimaryButton>
      <MessageBlock>
        <LocaleText message={AUTH.TERMS_AGREEMENT} />
        <MessageBlockLink onClick={showTaC}>
          <LocaleText message={COMMON.TERMS_AND_CONDITIONS} />
        </MessageBlockLink>.
      </MessageBlock>
    </form>
  )
}

SignUpForm.propTypes = {
  showTaC: PropTypes.func.isRequired,
}

export default SignUpForm
