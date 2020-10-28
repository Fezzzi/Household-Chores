import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Edit } from '@material-ui/icons';

import { EditableFieldIcon, EditableFieldWrapper } from 'clientSrc/styles/blocks/common';
import { editableFieldProps, useEditableFieldLogic } from 'clientSrc/helpers/editableField';
import * as InputTypes from 'shared/constants/inputTypes';

import { Input } from '../forms/index';

const EditableField = ({ input, editing, setEditing, children }) => {
  const [hovering, setHovering] = useState(false);

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
        ? <>{input}</>
        : (
          <>
            {children}
            {hovering && <EditableFieldIcon centered={true}><Edit /></EditableFieldIcon>}
          </>
        )
      }
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
