import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Check } from '@material-ui/icons'

import {
  InputRow, PaddedInputWrapper, BoolInputBox, BoolInputField,
  InputLabel, BoolInputLabel,
} from 'clientSrc/styles/blocks/form'

import LocaleText from '../LocaleText'

const BoolInput = ({ name, label, value, onUpdate }) => {
  const [inputActive, setInputActive] = useState(false)
  const [isOn, setIsOn] = useState(null)

  const handleChange = value => {
    setIsOn(value)
    onUpdate(true, value)
  }

  return (
    <InputRow>
      <InputLabel>
        <LocaleText message={label} />
      </InputLabel>
      <PaddedInputWrapper active={inputActive}>
        <BoolInputBox htmlFor={name}>
          <BoolInputLabel>
            {(isOn !== null ? isOn : value) && <Check />}
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

BoolInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
}

export default BoolInput
