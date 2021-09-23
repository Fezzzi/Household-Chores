import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { HINT } from 'shared/constants/localeMessages'
import { INPUT_TYPE } from 'shared/constants'
import { EditIcon } from 'web/styles/icons'
import { EditableFieldIcon, EditableFieldWrapper } from 'web/styles/blocks/common'
import { editableFieldProps } from 'web/helpers/editableField'
import { useUpdateHandler } from 'web/helpers/form'

import Input from '../Input'

const EditablePhotoField = ({
  name, size, iconRight, error, setFormState, isFormValidFunc, children,
}) => {
  const [hovering, setHovering] = useState(false)
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const handleUpdate = useUpdateHandler(setFormState, isFormValidFunc)

  const handleFileRemove = e => {
    setEditing(false)
    setHovering(false)
    e.stopPropagation()
  }

  return (
    <EditableFieldWrapper
      editing={editing}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        setEditing(true)
        setHovering(false)
      }}
    >
      {editing
        ? (
          <Input
            name={name}
            type={INPUT_TYPE.PHOTO}
            hint={HINT.VISIBILITY}
            inputError={error}
            onUpdate={handleUpdate}
            onFileRemove={handleFileRemove}
            closable
            size={size}
            reference={inputRef}
          />
        ) : (
          <>
            {children}
            {hovering && (
              <EditableFieldIcon iconRight={iconRight} centered={false}>
                <EditIcon />
              </EditableFieldIcon>
            )}
          </>
        )}
    </EditableFieldWrapper>
  )
}

EditablePhotoField.defaultProps = {
  iconRight: 15,
}

EditablePhotoField.propTypes = {
  ...editableFieldProps,
  size: PropTypes.number,
  iconRight: PropTypes.number,
}

export default EditablePhotoField
