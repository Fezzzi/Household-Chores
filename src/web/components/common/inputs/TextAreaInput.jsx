import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { INPUT_TYPE } from 'shared/constants'
import { isInputValid } from 'shared/helpers/validation'
import { CloseIcon } from 'web/styles/icons'
import {
  InputWrapper, ErrorSpan, TextAreaField, TextAreaBox, TextAreaRow, TextAreaErrorWrapper, TextAreaValue,
} from 'web/styles/blocks/form'

import { InfoTooltip, InputHintTooltip } from '../../portals'
import LocaleText from '../LocaleText'

const TextAreaInput = ({
  name, value, hint, minLength, maxLength, rows, cols, showRemaining, reference, hasDefaultValue, inputError, onUpdate,
}) => {
  const [state, setState] = useState({
    inputTextLength: 0,
    inputActive: false,
  })

  const handleInputChange = useCallback(({ target }) => {
    setState(prevState => ({
      ...prevState,
      inputTextLength: target.value.length,
    }))

    const { valid, message } = isInputValid(INPUT_TYPE.TEXT_AREA, target.value, { min: minLength, max: maxLength })
    onUpdate(name, valid, target.value, message, hasDefaultValue ? value : null)
  }, [name, value, hasDefaultValue, onUpdate])

  const { inputTextLength, inputActive } = state
  const showError = useMemo(() => !inputActive && !!inputError, [inputActive, inputError])

  return (
    <TextAreaRow>
      <InputWrapper active={inputActive}>
        <TextAreaBox htmlFor={name}>
          {hint && <InputHintTooltip text={hint} />}

          <TextAreaValue shrunken={inputTextLength !== 0}>
            <LocaleText
              message={value}
              modifierFunc={value => showRemaining
                ? `${value} (${maxLength - state.inputTextLength})`
                : value}
            />
          </TextAreaValue>
          <TextAreaField
            name={name}
            ref={reference}
            onChange={handleInputChange}
            onFocus={() => setState(prevState => ({ ...prevState, inputActive: true }))}
            onBlur={() => setState(prevState => ({ ...prevState, inputActive: false }))}
            shrunken={inputTextLength !== 0}
            rows={rows}
            cols={cols}
            maxLength={maxLength}
            noValidate
          />

          {showError && (
            <TextAreaErrorWrapper>
              <ErrorSpan>
                <InfoTooltip icon={<CloseIcon />} text={inputError} />
              </ErrorSpan>
            </TextAreaErrorWrapper>
          )}
        </TextAreaBox>
      </InputWrapper>
    </TextAreaRow>
  )
}

TextAreaInput.defaultProps = {
  hasDefaultValue: false,
  showRemaining: false,
}

TextAreaInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  minLength: PropTypes.number,
  rows: PropTypes.number,
  cols: PropTypes.number,
  hint: PropTypes.string,
  hasDefaultValue: PropTypes.bool,
  showRemaining: PropTypes.bool,
  reference: PropTypes.object,
  inputError: PropTypes.string,
  onUpdate: PropTypes.func,
}

export default TextAreaInput
