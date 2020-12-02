import React from 'react'
import { PropTypes } from 'prop-types'

import { MessageBlock, LinkRow } from 'clientSrc/styles/blocks/auth'
import { useFormState, useFormValidOnFilled, useUpdateHandler, useSubmitHandler } from 'clientSrc/helpers/form'
import { AUTH_TABS } from 'clientSrc/constants'
import { AuthActions } from 'clientSrc/actions'
import { INPUT_TYPE } from 'shared/constants'
import { AUTH, COMMON, FORM } from 'shared/constants/localeMessages'

import { PrimaryButton, LocaleText } from '../../common'
import { TextInput } from '../../common/inputs'
import Separator from '../Separator'

const inputConfig = [
  { name: 'email', message: FORM.EMAIL, type: INPUT_TYPE.EMAIL },
]

const ResetPassForm = ({ switchTab }) => {
  const {
    submitMessage,
    isFormValid,
    isFormSending,
    inputs,
    errors,
    setFormState,
  } = useFormState([], AUTH.SEND_RESET_LINK, false)

  const formValidFunc = useFormValidOnFilled(inputConfig.map(input => input.name))
  const updateHandler = useUpdateHandler(setFormState, formValidFunc)
  const submitHandler = useSubmitHandler(AuthActions.resetPass)
  const handleSubmit = () => submitHandler(inputs, setFormState, AUTH.SEND_RESET_LINK, COMMON.SENDING)

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
          onUpdate={updateHandler}
        />
      ))}
      <PrimaryButton disabled={!isFormValid || isFormSending} onClick={handleSubmit}>
        <LocaleText message={submitMessage} />
      </PrimaryButton>
      <Separator message={COMMON.OR} />
      <LinkRow onClick={() => switchTab(AUTH_TABS.SIGNUP_TAB)}>
        <LocaleText message={AUTH.CREATE_ACCOUNT} />
      </LinkRow>
    </form>
  )
}

ResetPassForm.propTypes = {
  switchTab: PropTypes.func.isRequired,
}

export default ResetPassForm
