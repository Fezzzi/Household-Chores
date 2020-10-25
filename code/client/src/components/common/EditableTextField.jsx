import React, { useEffect, useRef } from 'react';
import { Edit } from '@material-ui/icons';

import { EditableFieldIcon, EditableFieldWrapper } from 'clientSrc/styles/blocks/common';
import { EditableFieldProps, useEditableFieldLogic } from 'clientSrc/helpers/editableField';
import * as InputTypes from 'shared/constants/inputTypes';

import { Input } from '../forms/index';

const EditableTextField = ({ name, placeholder, setFormState, children }) => {
  const {
    editing,
    setEditing,
    edited,
    hovering,
    setHovering,
    updateHandler,
  } = useEditableFieldLogic(placeholder, setFormState);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [editing]);

  return (
    <EditableFieldWrapper
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        !editing && setEditing(true);
        hovering && setHovering(false);
      }}
      onBlur={() => !edited && setEditing(false)}
    >
      {editing
        ? (
          <Input
            name={name}
            type={InputTypes.TEXT}
            message={placeholder}
            updateInput={updateHandler}
            reference={inputRef}
          />
        ) : (
          <>
            {children}
            {hovering && <EditableFieldIcon centered={true}><Edit /></EditableFieldIcon>}
          </>
        )}
    </EditableFieldWrapper>
  );
};

EditableTextField.propTypes = EditableFieldProps;

export default EditableTextField;
