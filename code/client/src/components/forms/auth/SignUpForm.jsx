import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { INPUT_TYPE, NOTIFICATION_TYPE, API } from 'shared/constants'
import { AUTH, COMMON, FORM } from 'shared/constants/localeMessages'
import { AuthActions, NotificationActions } from 'clientSrc/actions'
import { MessageBlock, MessageBlockLink } from 'clientSrc/styles/blocks/auth'
import { updateInput, handlerWrapper } from 'clientSrc/helpers/form'
import { SUBMIT_TIMEOUT } from 'clientSrc/constants'

import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'
import { TextInput, PrimaryButton } from '../../common'
import Separator from '../Separator'
import LocaleText from '../../common/LocaleText'

const inputConfig = [
  { name: 'email', message: FORM.EMAIL, type: INPUT_TYPE.EMAIL },
  { name: 'nickname', message: FORM.NICKNAME, type: INPUT_TYPE.TEXT },
  { name: 'password', message: FORM.PASSWORD, type: INPUT_TYPE.PASSWORD },
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

  const handleError = error => addNotification(NOTIFICATION_TYPE.ERRORS, error.message)

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
        <MessageBlockLink target="_self" href={`/${API.RESOURCES_PREFIX}/${API.RESOURCE_TAC}`}>
          <LocaleText message={COMMON.TERMS_AND_CONDITIONS} />
        </MessageBlockLink>.
      </MessageBlock>
    </form>
  )
}

export default SignUpForm
