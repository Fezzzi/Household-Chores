import { clientApi } from 'clientSrc/client-api';

export const signUp = data => clientApi.post('auth/sign-up', data);
export const logIn = data => clientApi.post('auth/log-in', data);
export const resetPass = data => clientApi.post('auth/reset', data);
