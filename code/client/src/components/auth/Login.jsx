import React from 'react';

import * as InputTypes from 'clientSrc/constants/inputTypes';

import { Input } from './Input';

export const Login = () => (
  <>
    <div />
    <Input name="email" label="Email" type={InputTypes.EMAIL} />
    <Input name="password" label="Password" type={InputTypes.PASSWORD} />
  </>
);
