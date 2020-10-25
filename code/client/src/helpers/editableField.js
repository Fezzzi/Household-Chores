import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const useEditableFieldLogic = (placeholder, setFormState) => {
  const [hovering, setHovering] = useState(false);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);

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

  return {
    editing,
    setEditing,
    edited,
    hovering,
    setHovering,
    updateHandler,
  };
}

export const EditableFieldProps = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  setFormState: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
};
