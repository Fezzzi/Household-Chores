import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Edit } from '@material-ui/icons'

import { editableFieldProps } from 'clientSrc/helpers/editableField'
import { useUpdateHandler } from 'clientSrc/helpers/form'
import { getLabelColors } from 'clientSrc/helpers/household'
import { EditableFieldIcon, EditableFieldWrapper, EditableLabel, EditableLabelBox } from 'clientSrc/styles/blocks/common'
import { RoleLabel, UserLabel } from 'clientSrc/styles/blocks/households'

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
            {hovering && <EditableFieldIcon centered><Edit /></EditableFieldIcon>}
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
