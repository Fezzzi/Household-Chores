import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Edit } from '@material-ui/icons';

import { EditableFieldIcon, EditableFieldWrapper } from 'clientSrc/styles/blocks/common';

const EditableField = ({ input, editing, setEditing, children }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <EditableFieldWrapper
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
        setEditing(true);
        setHovering(false);
      }}
    >
      {editing
        ? <>{input}</>
        : (
          <>
            {children}
            {hovering && <EditableFieldIcon centered><Edit /></EditableFieldIcon>}
          </>
        )}
    </EditableFieldWrapper>
  );
};

EditableField.propTypes = {
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  input: PropTypes.element.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default EditableField;
