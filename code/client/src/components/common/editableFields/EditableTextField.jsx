import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Edit } from '@material-ui/icons'

import { EditableFieldIcon, EditableFieldWrapper } from 'clientSrc/styles/blocks/common'
import { editableFieldProps } from 'clientSrc/helpers/editableField'
import { useUpdateHandler } from 'clientSrc/helpers/form'
import { INPUT_TYPE } from 'shared/constants'

import Input from '../Input'

const EditableTextField = ({
  name, edited, placeholder, error, setFormState, isEmail, isFormValidFunc, children,
}) => {
  const [hovering, setHovering] = useState(false)
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const handleUpdate = useUpdateHandler(setFormState, isFormValidFunc)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [editing])

  return (
    <EditableFieldWrapper
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        setEditing(true)
        setHovering(false)
      }}
      onBlur={() => !edited && setEditing(false)}
    >
      {editing
        ? (
          <Input
            name={name}
            type={isEmail ? INPUT_TYPE.EMAIL : INPUT_TYPE.TEXT}
            value={placeholder}
            hasDefaultValue
            inputError={error}
            onUpdate={handleUpdate}
            reference={inputRef}
          />
        ) : (
          <>
            {children}
            {hovering && <EditableFieldIcon centered><Edit /></EditableFieldIcon>}
          </>
        )}
    </EditableFieldWrapper>
  )
}

EditableTextField.defaultProps = {
  isEmail: false,
  edited: false,
}

EditableTextField.propTypes = {
  ...editableFieldProps,
  isEmail: PropTypes.bool,
  edited: PropTypes.bool,
}

export default EditableTextField
