import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Edit, HighlightOff, ChevronLeft } from '@material-ui/icons'

import {
  InputRow, TextInputField, InputWrapper, TextInputBox, TextInputValue, InputPlaceholder,
  ToggleInputIcon, InputLabel, FixedInputBlock, ErrorSpan, ShowPassWrapper,
  ShowPassButton, InputSiderWrapper,
} from 'clientSrc/styles/blocks/form'
import { INPUT_TYPE } from 'shared/constants'
import { COMMON } from 'shared/constants/localeMessages'
import { isInputValid } from 'shared/helpers/validation'

import { InfoTooltip } from '../../portals'
import LocaleText from '../LocaleText'

const TextInput = ({
  name, value, label, placeholder, type, reference,
  inputError, inline, fixedPadding, fixedProps, onUpdate,
}) => {
  const [state, setState] = useState({
    inputTextLength: 0,
    showPassword: false,
    inputActive: false,
    inputShown: null,
  })

  const handleInputChange = ({ target }) => {
    setState(prevState => ({
      ...prevState,
      inputTextLength: target.value.length,
    }))

    const { valid, message } = isInputValid(type, target.value)
    onUpdate(valid, target.value, message)
  }

  const { inputTextLength, showPassword, inputActive, inputShown } = state

  const getInputBody = () => {
    const showPassButton = type === INPUT_TYPE.PASSWORD && inputTextLength > 0
    const showError = !inputActive && !!inputError

    return (
      <>
        {(inputShown === true || (inputShown === null && !placeholder)) && (
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
        {placeholder && (
          <>
            {!inputShown && label && (
              <InputLabel>
                <LocaleText message={label} />
              </InputLabel>
            )}
            <ToggleInputIcon>
              {inputShown
                ? <ChevronLeft onClick={() => setState(prevState => ({ ...prevState, inputShown: false }))} />
                : <Edit onClick={() => setState(prevState => ({ ...prevState, inputShown: true }))} />}
            </ToggleInputIcon>
            <InputPlaceholder>
              {placeholder}
            </InputPlaceholder>
          </>
        )}
      </>
    )
  }

  return inline
    ? (
      <FixedInputBlock {...fixedProps}>
        {getInputBody()}
      </FixedInputBlock>
    ) : (
      <InputRow fixedPadding={fixedPadding}>
        {getInputBody()}
      </InputRow>
    )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  inline: PropTypes.bool,
  fixedPadding: PropTypes.bool,
  fixedProps: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  reference: PropTypes.object,
  inputError: PropTypes.string,
  onUpdate: PropTypes.func,
}

export default TextInput
