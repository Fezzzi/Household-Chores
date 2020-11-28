import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PropTypes } from 'prop-types'

import * as InputTypes from 'shared/constants/inputTypes'
import * as NotificationTypes from 'shared/constants/notificationTypes'
import { AUTH, COMMON, FORM } from 'shared/constants/localeMessages'
import * as AuthActions from 'clientSrc/actions/authActions'
import * as NotificationActions from 'clientSrc/actions/notificationActions'
import { LinkRow } from 'clientSrc/styles/blocks/auth'
import { updateInput, handlerWrapper } from 'clientSrc/helpers/form'
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common'
import * as TABS from 'clientSrc/constants/authTabs'

import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'
import TextInput from '../inputs/TextInput'
import PrimaryButton from '../common/PrimaryButton'
import Separator from '../common/Separator'
import LocaleText from '../../common/LocaleText'

const inputConfig = [
  { name: 'email', message: FORM.EMAIL, type: InputTypes.EMAIL },
  { name: 'password', message: FORM.PASSWORD, type: InputTypes.PASSWORD },
]

const LogInForm = ({ history }) => {
  const dispatch = useDispatch()
  const logIn = useCallback(values => dispatch(AuthActions.logIn(values)), [dispatch])
  const addNotification = useCallback((type, message) =>
    dispatch(NotificationActions.addNotifications({ [type]: [message] })),
  [dispatch])

  const [timer, setTimer] = useState(null)
  const [state, setState] = useState({
    submitMessage: AUTH.LOG_IN,
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
    logIn(inputs)
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: COMMON.SENDING,
    }))
    setTimer(setTimeout(
      () => setState(prevState => ({
        ...prevState,
        isFormSending: false,
        submitMessage: AUTH.LOG_IN,
      })), SUBMIT_TIMEOUT
    ))
  })

  const switchTab = () => history.push(TABS.RESET_TAB)

  return (
    <form method="post">
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
      <Separator message={COMMON.OR} />
      <FacebookLoginButton onError={handleError} />
      <GoogleLoginButton onError={handleError} />
      <LinkRow onClick={switchTab}>
        <LocaleText message={AUTH.FORGOT_PASS} />
      </LinkRow>
    </form>
  )
}

LogInForm.propTypes = {
  history: PropTypes.object.isRequired,
}

export default LogInForm
