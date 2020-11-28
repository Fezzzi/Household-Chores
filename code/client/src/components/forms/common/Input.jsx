import React from 'react'
import PropTypes from 'prop-types'

import { INPUT_TYPE } from 'shared/constants'

import TextInput from '../inputs/TextInput'
import PhotoInput from '../inputs/PhotoInput'
import BoolInput from '../inputs/BoolInput'
import SwitchInput from '../inputs/SwitchInput'

const Input = ({ type, ...props }) => {
  switch (type) {
    case INPUT_TYPE.PHOTO:
      return <PhotoInput {...props} />
    case INPUT_TYPE.BOOL:
      return <BoolInput {...props} />
    case INPUT_TYPE.SWITCH:
      return <SwitchInput {...props} />
    default:
      return <TextInput type={type} {...props} />
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  type: PropTypes.string.isRequired,
  inputError: PropTypes.string,
  onUpdate: PropTypes.func,
}

export default Input
