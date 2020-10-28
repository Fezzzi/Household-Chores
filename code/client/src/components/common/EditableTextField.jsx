import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Edit } from '@material-ui/icons';

import { EditableFieldIcon, EditableFieldWrapper } from 'clientSrc/styles/blocks/common';
import { editableFieldProps } from 'clientSrc/helpers/editableField';
import { updateHandler } from 'clientSrc/helpers/form';
import * as InputTypes from 'shared/constants/inputTypes';

import Input from '../forms/common/Input';

const EditableTextField = ({
  name, edited, placeholder, error, setFormState, isEmail, isFormValidFunc, children,
}) => {
  const [hovering, setHovering] = useState(false);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const handleUpdate = updateHandler(name, setFormState, isFormValidFunc, placeholder);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <EditableFieldWrapper
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        setEditing(true);
        setHovering(false);
      }}
      onBlur={() => !edited && setEditing(false)}
    >
      {editing
        ? (
          <Input
            name={name}
            type={isEmail ? InputTypes.EMAIL : InputTypes.TEXT}
            message={placeholder}
            inputError={error}
            updateInput={handleUpdate}
            reference={inputRef}
          />
        ) : (
          <>
            {children}
            {hovering && <EditableFieldIcon centered><Edit /></EditableFieldIcon>}
          </>
        )}
    </EditableFieldWrapper>
  );
};

EditableTextField.defaultProps = {
  isEmail: false,
  edited: false,
};

EditableTextField.propTypes = {
  ...editableFieldProps,
  isEmail: PropTypes.bool,
  edited: PropTypes.bool,
};

export default EditableTextField;
