import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TextInputBox, TextInputField, TextInputValue } from 'clientSrc/styles/blocks/form'
import { MiniInputWrapper } from 'clientSrc/styles/blocks/common'
import { INPUT_TYPE } from 'shared/constants'

import LocaleText from '../../common/LocaleText'

const MiniTextInput = ({ name, reference, value, handleChange }) => {
  const [inputTextLength, setInputTextLength] = useState(0)
  const [inputActive, setInputActive] = useState(false)

  const handleInputChange = e => {
    setInputTextLength(e.target.value.length)
    handleChange(e.target.value)
  }

  return (
    <MiniInputWrapper active={inputActive}>
      <TextInputBox htmlFor={name} lineHeight={26}>
        <TextInputValue shrunken={inputTextLength !== 0} lineHeight={26} miniInput>
          <LocaleText message={value} />
        </TextInputValue>
        <TextInputField
          lineHeight={26}
          name={name}
          type={INPUT_TYPE.TEXT}
          ref={reference}
          onChange={handleInputChange}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          shrunken={inputTextLength !== 0}
          noValidate
          miniInput
        />
      </TextInputBox>
    </MiniInputWrapper>
  )
}

MiniTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  reference: PropTypes.object,
}

export default MiniTextInput
