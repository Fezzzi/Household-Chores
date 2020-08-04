import { AUTH_PREFIX, AUTH_LOG_IN, AUTH_SIGN_UP, AUTH_RESET } from 'shared/constants/api';
import { clientApi } from 'clientSrc/client-api';

export const signUp = data => clientApi.post(`${AUTH_PREFIX}/${AUTH_SIGN_UP}`, data);
export const logIn = data => clientApi.post(`${AUTH_PREFIX}/${AUTH_LOG_IN}`, data);
export const resetPass = data => clientApi.post(`${AUTH_PREFIX}/${AUTH_RESET}`, data);
