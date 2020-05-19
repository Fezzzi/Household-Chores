import React from 'react';
import PropTypes from 'prop-types';

import * as TYPES from 'clientSrc/constants/inputTypes';
import { InputRow } from 'clientSrc/styles/blocks/auth';

export const Input = ({ name, label, type }) => (
  <InputRow>
    <div>
      <label htmlFor={name}>
        <span>{label}</span>
        <input name={name} type={type} />
      </label>
      <div>
        { type === TYPES.PASSWORD
          ? (
            <div>
              <button>SHOW</button>
            </div>
          )
          : '' }
      </div>
    </div>
  </InputRow>
);

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};
