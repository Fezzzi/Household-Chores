import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Edit } from '@material-ui/icons'

import { EditableFieldIcon, EditableFieldWrapper } from 'clientSrc/styles/blocks/common'
import { editableFieldProps } from 'clientSrc/helpers/editableField'
import { useUpdateHandler } from 'clientSrc/helpers/form'
import { INPUT_TYPE } from 'shared/constants'

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
                <Edit />
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
