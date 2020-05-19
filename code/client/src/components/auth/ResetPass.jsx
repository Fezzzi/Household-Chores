import React from 'react';

import * as InputTypes from 'clientSrc/constants/inputTypes';

import { Input } from './Input';

export const ResetPass = () => (
  <>
    <div></div>
    <Input name="email" label="Email" type={InputTypes.EMAIL} />
  </>
);
