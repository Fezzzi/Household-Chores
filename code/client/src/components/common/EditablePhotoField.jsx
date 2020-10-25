import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from '@material-ui/icons';

import { EditableFieldIcon, EditableFieldWrapper } from 'clientSrc/styles/blocks/common';
import { EditableFieldProps, useEditableFieldLogic } from 'clientSrc/helpers/editableField';
import * as InputTypes from 'shared/constants/inputTypes';

import { Input } from '../forms/index';

const EditablePhotoField = ({ name, size, iconRight, placeholder, setFormState, children }) => {
  const {
    editing,
    setEditing,
    hovering,
    setHovering,
    inputRef,
    updateHandler,
  } = useEditableFieldLogic(placeholder, setFormState);

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
            updateInput={updateHandler}
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
  ...EditableFieldProps,
  size: PropTypes.number,
  iconRight: PropTypes.number,
};

export default EditablePhotoField;
