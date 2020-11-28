import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as InputTypes from 'shared/constants/inputTypes'
import * as NotificationTypes from 'shared/constants/notificationTypes'
import { AUTH, COMMON, FORM } from 'shared/constants/localeMessages'
import { RESOURCES_PREFIX, RESOURCE_TAC } from 'shared/constants/api'
import { AuthActions, NotificationActions } from 'clientSrc/actions'
import { MessageBlock, MessageBlockLink } from 'clientSrc/styles/blocks/auth'
import { updateInput, handlerWrapper } from 'clientSrc/helpers/form'
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common'

import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'
import TextInput from '../inputs/TextInput'
import Separator from '../common/Separator'
import PrimaryButton from '../common/PrimaryButton'
import LocaleText from '../../common/LocaleText'

const inputConfig = [
  { name: 'email', message: FORM.EMAIL, type: InputTypes.EMAIL },
  { name: 'nickname', message: FORM.NICKNAME, type: InputTypes.TEXT },
  { name: 'password', message: FORM.PASSWORD, type: InputTypes.PASSWORD },
]

const SignUpForm = () => {
  const dispatch = useDispatch()
  const signUp = useCallback(values => dispatch(AuthActions.signUp(values)), [dispatch])
  const addNotification = useCallback((type, message) =>
    dispatch(NotificationActions.addNotifications({ [type]: [message] })),
  [dispatch])

  const [timer, setTimer] = useState(null)
  const [state, setState] = useState({
    submitMessage: AUTH.SIGN_UP,
    isFormValid: false,
    isFormSending: false,
    inputs: Object.fromEntries(inputConfig.map(input =>
      [input.name, { valid: false, value: '' }]
    )),
    errors: {},
  })

  useEffect(() => { if (timer) { clearTimeout(timer) } }, [])

  const handleError = error => addNotification(NotificationTypes.ERRORS, error.message)

  const { submitMessage, isFormValid, isFormSending, inputs, errors } = state

  const handleClick = handlerWrapper(() => {
    signUp(inputs)
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: COMMON.SENDING,
    }))
    setTimer(setTimeout(
      () => setState(prevState => ({
        ...prevState,
        isFormSending: false,
        submitMessage: AUTH.SIGN_UP,
      })), SUBMIT_TIMEOUT
    ))
  })

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
          onUpdate={updateInput(setState.bind(this), input.name)}
        />
      ))}
      <PrimaryButton disabled={!isFormValid || isFormSending} onClick={handleClick}>
        <LocaleText message={submitMessage} />
      </PrimaryButton>
      <MessageBlock>
        <LocaleText message={AUTH.TERMS_AGREEMENT} />
        <MessageBlockLink target="_self" href={`/${RESOURCES_PREFIX}/${RESOURCE_TAC}`}>
          <LocaleText message={COMMON.TERMS_AND_CONDITIONS} />
        </MessageBlockLink>.
      </MessageBlock>
    </form>
  )
}

export default SignUpForm
