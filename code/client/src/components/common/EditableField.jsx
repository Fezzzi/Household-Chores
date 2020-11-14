import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Edit } from '@material-ui/icons';

import { EditableFieldIcon, EditableFieldWrapper } from 'clientSrc/styles/blocks/common';

const EditableField = ({ input, editing, setEditing, iconRight, centered, children }) => {
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
            {hovering && <EditableFieldIcon iconRight={iconRight} centered={centered}><Edit /></EditableFieldIcon>}
          </>
        )}
    </EditableFieldWrapper>
  );
};

EditableField.defaultProps = {
  iconRight: 0,
  centered: true,
};

EditableField.propTypes = {
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  input: PropTypes.element.isRequired,
  iconRight: PropTypes.number,
  centered: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
};

export default EditableField;
