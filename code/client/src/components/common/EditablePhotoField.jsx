import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Edit } from '@material-ui/icons';

import { EditableFieldIcon, EditableFieldWrapper } from 'clientSrc/styles/blocks/common';
import { editableFieldProps } from 'clientSrc/helpers/editableField';
import { updateHandler } from 'clientSrc/helpers/form';
import * as InputTypes from 'shared/constants/inputTypes';

import { Input } from '../forms/index';

const EditablePhotoField = ({
  name, size, iconRight, placeholder, error, setFormState, isFormValidFunc, children
}) => {
  const [hovering, setHovering] = useState(false);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const handleUpdate = updateHandler(name, setFormState, isFormValidFunc, placeholder);

  const handleFileRemove = e => {
    setEditing(false)
    e.stopPropagation();
  };

  return (
    <EditableFieldWrapper
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        !editing && setEditing(true);
        hovering && setHovering(false);
      }}
    >
      {editing
        ? (
          <Input
            name={name}
            type={InputTypes.PHOTO}
            message={placeholder}
            inputError={error}
            updateInput={handleUpdate}
            onFileRemove={handleFileRemove}
            closable={true}
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
  );
};

EditablePhotoField.defaultProps = {
  iconRight: 15,
}

EditablePhotoField.propTypes = {
  ...editableFieldProps,
  size: PropTypes.number,
  iconRight: PropTypes.number,
};

export default EditablePhotoField;
