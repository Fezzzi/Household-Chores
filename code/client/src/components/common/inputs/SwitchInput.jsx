import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import {
  InputRow, PaddedInputWrapper, SwitchInputBox,
  InputLabel, SwitchInputLabel, SwitchInputValue,
} from 'clientSrc/styles/blocks/form'
import { FORM } from 'shared/constants/localeMessages'

import LocaleText from '../LocaleText'

const SwitchInput = ({ name, label, values, value, hasDefaultValue, onUpdate }) => {
  const [selectedValue, setSelectedValue] = useState(null)

  const handleChange = useCallback(newValue => {
    if (newValue === selectedValue) {
      return
    }

    setSelectedValue(newValue)
    onUpdate(name, true, newValue, '', hasDefaultValue ? value : null)
  }, [name, value, hasDefaultValue, onUpdate])

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

SwitchInput.defaultProps = {
  hasDefaultValue: false,
}

SwitchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  hasDefaultValue: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
}

export default SwitchInput
