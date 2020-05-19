import React from 'react';

import * as InputTypes from 'clientSrc/constants/inputTypes';
import { InputsBlock } from 'clientSrc/styles/blocks/auth';

import { Input } from './Input';

export const ResetPass = () => (
  <InputsBlock>
    <div></div>
    <Input name="email" label="Email" type={InputTypes.EMAIL} />
  </InputsBlock>
);
