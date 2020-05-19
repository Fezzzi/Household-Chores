import React from 'react';

import * as InputTypes from 'clientSrc/constants/inputTypes';
import { InputsBlock } from 'clientSrc/styles/blocks/auth';

import { Input } from './Input';

export const Signup = () => (
  <InputsBlock>
    <div></div>
    <Input name="email" label="Email" type={InputTypes.EMAIL} />
    <Input name="nickname" label="Nickname" type={InputTypes.TEXT} />
    <Input name="password" label="Password" type={InputTypes.PASSWORD} />
  </InputsBlock>
);
