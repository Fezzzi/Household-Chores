import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PropTypes } from 'prop-types'

import { MessageBlock, LinkRow } from 'clientSrc/styles/blocks/auth'
import { updateInput, handlerWrapper } from 'clientSrc/helpers/form'
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common'
import * as AuthActions from 'clientSrc/actions/authActions'
import * as InputTypes from 'shared/constants/inputTypes'
import { AUTH, COMMON, FORM } from 'shared/constants/localeMessages'
import * as TABS from 'clientSrc/constants/authTabs'

import TextInput from '../inputs/TextInput'
import Separator from '../common/Separator'
import PrimaryButton from '../common/PrimaryButton'
import LocaleText from '../../common/LocaleText'

const inputConfig = [
  { name: 'email', message: FORM.EMAIL, type: InputTypes.EMAIL },
]

const ResetPassForm = ({ history }) => {
  const dispatch = useDispatch()
  const resetPass = useCallback(values => dispatch(AuthActions.resetPass(values)), [dispatch])

  const [timer, setTimer] = useState(null)
  const [state, setState] = useState({
    submitMessage: AUTH.SEND_RESET_LINK,
    isFormValid: false,
    isFormSending: false,
    inputs: Object.fromEntries(inputConfig.map(input =>
      [input.name, { valid: false, value: '' }]
    )),
    errors: {},
  })

  useEffect(() => { if (timer) { clearTimeout(timer) } }, [])

  const { submitMessage, isFormValid, isFormSending, inputs, errors } = state

  const handleClick = handlerWrapper(() => {
    resetPass(inputs)
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: COMMON.SENDING,
    }))
    setTimer(setTimeout(
      () => setState(prevState => ({
        ...prevState,
        isFormSending: false,
        submitMessage: AUTH.SEND_RESET_LINK,
      })), SUBMIT_TIMEOUT
    ))
  })

  const switchTab = () => history.push(TABS.SIGNUP_TAB)

  return (
    <form method="post">
      <MessageBlock bigFont margin="0 40px 10px;">
        <LocaleText message={AUTH.ENTER_EMAIL_QUOTE} />
      </MessageBlock>
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
      <LinkRow onClick={switchTab}>
        <LocaleText message={AUTH.CREATE_ACCOUNT} />
      </LinkRow>
    </form>
  )
}

ResetPassForm.propTypes = {
  history: PropTypes.object.isRequired,
}

export default ResetPassForm
