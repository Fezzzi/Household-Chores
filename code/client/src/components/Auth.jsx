import React from 'react';

import { Login } from './auth/Login';
import { Signup } from './auth/Signup';
import { ResetPass } from './auth/ResetPass';

export const Auth = () => (
  <>
    <div></div>
    <Login />
    <Signup />
    <ResetPass />
  </>
);
