import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { CheckIcon } from 'web/styles/icons'
import {
  InputRow, PaddedInputWrapper, BoolInputBox, BoolInputField, BoolInputMessage, BoolInputLabel,
} from 'web/styles/blocks/form'

import LocaleText from '../LocaleText'
import { InputHintTooltip } from '../../portals'

const BoolInput = ({ name, label, value, hint, hasDefaultValue, alignLeft, isSmall, onUpdate }) => {
  const [inputActive, setInputActive] = useState(false)
  const [isOn, setIsOn] = useState(null)

  const handleChange = useCallback(newValue => {
    setIsOn(newValue)
    onUpdate(name, true, newValue, '', hasDefaultValue ? value : null)
  }, [name, value, hasDefaultValue, onUpdate])

  return (
    <InputRow fixedPadding={alignLeft} isSmall={isSmall}>
      <BoolInputMessage isSmall={isSmall}>
        <LocaleText message={label} />
      </BoolInputMessage>
      <PaddedInputWrapper alignLeft={alignLeft} active={inputActive}>
        <BoolInputBox htmlFor={name} isSmall={isSmall}>
          {hint && <InputHintTooltip text={hint} />}
          <BoolInputLabel isSmall={isSmall}>
            {(isOn !== null ? isOn : value) && <CheckIcon />}
          </BoolInputLabel>
          <BoolInputField
            name={name}
            type="checkbox"
            value={value}
            onChange={() => handleChange(isOn !== null ? !isOn : !value)}
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            noValidate
          />
        </BoolInputBox>
      </PaddedInputWrapper>
    </InputRow>
  )
}

BoolInput.defaultProps = {
  hasDefaultValue: false,
}

BoolInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  hint: PropTypes.string,
  hasDefaultValue: PropTypes.bool,
  alignLeft: PropTypes.bool,
  isSmall: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
}

export default BoolInput
