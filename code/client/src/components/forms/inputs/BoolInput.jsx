import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Check } from '@material-ui/icons'

import {
  InputRow, PaddedInputWrapper, BoolInputBox, BoolInputField,
  InputLabel, BoolInputLabel,
} from 'clientSrc/styles/blocks/form'

import LocaleText from '../../common/LocaleText'

const BoolInputComponent = ({ name, label, placeholder, updateInput }) => {
  const [inputActive, setInputActive] = useState(false)
  const [isOn, setIsOn] = useState(null)

  const handleChange = value => {
    setIsOn(value)
    updateInput(true, value)
  }

  return (
    <InputRow>
      <InputLabel>
        <LocaleText message={label} />
      </InputLabel>
      <PaddedInputWrapper active={inputActive}>
        <BoolInputBox htmlFor={name}>
          <BoolInputLabel>
            {(isOn !== null ? isOn : placeholder) && <Check />}
          </BoolInputLabel>
          <BoolInputField
            name={name}
            type="checkbox"
            value={placeholder}
            onChange={() => handleChange(isOn !== null ? !isOn : !placeholder)}
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            noValidate
          />
        </BoolInputBox>
      </PaddedInputWrapper>
    </InputRow>
  )
}

BoolInputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.bool,
  updateInput: PropTypes.func.isRequired,
}

export default BoolInputComponent
