import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Edit } from '@material-ui/icons';

import { EditableFieldIcon, EditableFieldWrapper } from 'clientSrc/styles/blocks/common';

import { Input } from '../forms/index';

const EditableField = ({ name, type, placeholder, setFormState, children, iconRight, centered }) => {
  const [hovering, setHovering] = useState(false);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);

  const inputRef = useRef(null);

  const updateHandler = (isValid, value, errorMessage) => {
    const edited = value !== '' && value !== placeholder;
    setEdited(edited);

    setFormState(prevState => {
      const newInputs = { ...prevState.inputs };
      if (edited) {
        newInputs[name] = value;
      } else {
        delete newInputs[name];
      }

      return {
        ...prevState,
        inputs: newInputs,
        errors: {
          ...prevState.errors,
          [name]: isValid || !value ? '' : errorMessage,
        },
      };
    });
  };

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
          <Input name={name} type={type} message={placeholder} updateInput={updateHandler} reference={inputRef} />
        ) : (
          <>
            {children}
            {hovering && <EditableFieldIcon iconRight={iconRight} centered={centered}><Edit /></EditableFieldIcon>}
          </>
        )}
    </EditableFieldWrapper>
  );
};

EditableField.defaultProps = {
  centered: true,
};

EditableField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  setFormState: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  iconRight: PropTypes.number,
  centered: PropTypes.bool,
};

export default EditableField;
