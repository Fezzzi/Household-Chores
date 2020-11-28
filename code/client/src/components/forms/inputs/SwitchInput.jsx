import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  InputRow, PaddedInputWrapper, SwitchInputBox,
  InputLabel, SwitchInputLabel, SwitchInputValue,
} from 'clientSrc/styles/blocks/form'
import { FORM } from 'shared/constants/localeMessages'

import LocaleText from '../../common/LocaleText'

const SwitchInput = ({ name, label, values, value, onUpdate }) => {
  const [selectedValue, setSelectedValue] = useState(null)

  const handleChange = newValue => {
    if (newValue === selectedValue) {
      return
    }

    setSelectedValue(newValue)
    onUpdate(true, newValue)
  }

  return (
    <InputRow>
      <InputLabel>
        <LocaleText message={label} />
      </InputLabel>
      <PaddedInputWrapper>
        <SwitchInputBox>
          <SwitchInputLabel>
            {values.map(switchValue => (
              <SwitchInputValue
                key={`${name}-${switchValue}`}
                selected={switchValue === (selectedValue ?? value)}
                onClick={() => handleChange(switchValue)}
              >
                {FORM[switchValue]
                  ? <LocaleText message={FORM[switchValue]} />
                  : switchValue}
              </SwitchInputValue>
            ))}
          </SwitchInputLabel>
        </SwitchInputBox>
      </PaddedInputWrapper>
    </InputRow>
  )
}

SwitchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
}

export default SwitchInput
