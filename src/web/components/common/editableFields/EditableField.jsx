import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { EditIcon } from 'web/styles/icons'
import { EditableFieldIcon, EditableFieldWrapper } from 'web/styles/blocks/common'

const EditableField = ({ editing, setEditing, iconRight, centered, children }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <EditableFieldWrapper
      editing={editing}
      onMouseEnter={() => !editing && setHovering(true)}
      onMouseLeave={() => !editing && setHovering(false)}
      onClick={() => {
        setEditing(true)
        setHovering(false)
      }}
    >
      {children}
      {!editing && hovering && (
        <EditableFieldIcon iconRight={iconRight} centered={centered}>
          <EditIcon />
        </EditableFieldIcon>
      )}
    </EditableFieldWrapper>
  )
}

EditableField.defaultProps = {
  iconRight: 0,
  centered: true,
}

EditableField.propTypes = {
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  iconRight: PropTypes.number,
  centered: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
}

export default EditableField
