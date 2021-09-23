import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { EditIcon } from 'web/styles/icons'
import { EditableFieldIcon, EditableFieldWrapper, EditableLabel, EditableLabelBox } from 'web/styles/blocks/common'
import { RoleLabel, UserLabel } from 'web/styles/blocks/households'
import { useUpdateHandler } from 'web/helpers/form'
import { getLabelColors } from 'web/helpers/household'
import { editableFieldProps } from 'web/helpers/editableField'

const EditableLabelField = ({
  name, defaultValue, values, placeholder, setFormState, isFormValidFunc, children,
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
      editing={editing}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        setEditing(true)
        setHovering(false)
      }}
      onBlur={() => setEditing(false)}
    >
      {editing
        ? (
          <EditableLabelBox tabIndex={-1} ref={inputRef}>
            {values.map(role => (
              <EditableLabel
                key={`option-${role}`}
                clickable={role !== placeholder}
                onClick={() => handleUpdate(name, true, role, null, defaultValue)}
              >
                <RoleLabel {...getLabelColors(role)}>{role}</RoleLabel>
              </EditableLabel>
            ))}
          </EditableLabelBox>
        ) : (
          <UserLabel>
            {children}
            {hovering && <EditableFieldIcon centered><EditIcon /></EditableFieldIcon>}
          </UserLabel>
        )}
    </EditableFieldWrapper>
  )
}

EditableLabelField.propTypes = {
  ...editableFieldProps,
  defaultValue: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default EditableLabelField
