import React from 'react';

import { AuthContent, InputsBlock } from 'clientSrc/styles/blocks/auth';

import { Login } from './auth/Login';
import { Signup } from './auth/Signup';
import { ResetPass } from './auth/ResetPass';

const show = true;

export const Auth = () => (
  <>
    <div></div>
    <AuthContent>
      <InputsBlock>
        { show
          ? <Login />
          : show
            ? <Signup />
            : <ResetPass /> }
      </InputsBlock>
    </AuthContent>
  </>
);
