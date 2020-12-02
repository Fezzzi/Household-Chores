import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { HighlightOff } from '@material-ui/icons'

import {
  InputRow, TextInputField, InputWrapper, TextInputBox, TextInputValue,
  ErrorSpan, ShowPassWrapper, ShowPassButton, InputSiderWrapper,
} from 'clientSrc/styles/blocks/form'
import { INPUT_TYPE } from 'shared/constants'
import { COMMON } from 'shared/constants/localeMessages'
import { isInputValid } from 'shared/helpers/validation'

import { InfoTooltip } from '../../portals'
import LocaleText from '../LocaleText'

const TextInput = ({
  name, value, type, reference, hasDefaultValue,
  inputError, fixedPadding, onUpdate,
}) => {
  const [state, setState] = useState({
    inputTextLength: 0,
    showPassword: false,
    inputActive: false,
    inputShown: null,
  })

  const handleInputChange = useCallback(({ target }) => {
    setState(prevState => ({
      ...prevState,
      inputTextLength: target.value.length,
    }))

    const { valid, message } = isInputValid(type, target.value)
    onUpdate(name, valid, target.value, message, hasDefaultValue ? value : null)
  }, [name, value, hasDefaultValue, onUpdate])

  const { inputTextLength, showPassword, inputActive, inputShown } = state
  const showPassButton = useMemo(() => type === INPUT_TYPE.PASSWORD && inputTextLength > 0, [inputTextLength])
  const showError = useMemo(() => !inputActive && !!inputError, [inputActive, inputError])

  return (
    <InputRow fixedPadding={fixedPadding}>
      {(inputShown === true || (inputShown === null)) && (
        <InputWrapper active={inputActive}>
          <TextInputBox htmlFor={name}>
            <TextInputValue shrunken={inputTextLength !== 0}>
              <LocaleText message={value} />
            </TextInputValue>
            <TextInputField
              name={name}
              type={type === INPUT_TYPE.PASSWORD && showPassword ? INPUT_TYPE.TEXT : type}
              ref={reference}
              onChange={handleInputChange}
              onFocus={() => setState(prevState => ({ ...prevState, inputActive: true }))}
              onBlur={() => setState(prevState => ({ ...prevState, inputActive: false }))}
              shrunken={inputTextLength !== 0}
              noValidate
            />
          </TextInputBox>
          {(showPassButton || showError) && (
            <InputSiderWrapper>
              {showError && (
                <ErrorSpan>
                  <InfoTooltip icon={<HighlightOff />} text={inputError} />
                </ErrorSpan>
              )}
              {showPassButton && (
                <ShowPassWrapper>
                  <ShowPassButton
                    tabIndex={-1}
                    onClick={e => {
                      e.preventDefault()
                      setState(prevState => ({ ...prevState, showPassword: !showPassword }))
                    }}
                  >
                    <LocaleText message={showPassword ? COMMON.HIDE : COMMON.SHOW} />
                  </ShowPassButton>
                </ShowPassWrapper>
              )}
            </InputSiderWrapper>
          )}
        </InputWrapper>
      )}
    </InputRow>
  )
}

TextInput.defaultProps = {
  hasDefaultValue: false,
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  hasDefaultValue: PropTypes.bool,
  fixedPadding: PropTypes.bool,
  type: PropTypes.string.isRequired,
  reference: PropTypes.object,
  inputError: PropTypes.string,
  onUpdate: PropTypes.func,
}

export default TextInput
