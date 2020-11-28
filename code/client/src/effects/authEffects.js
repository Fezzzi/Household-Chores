import { API } from 'shared/constants'
import { clientApi } from 'clientSrc/client-api'

export const signUp = data => clientApi.post(`${API.AUTH_PREFIX}/${API.AUTH_SIGN_UP}`, data)

export const logIn = data => clientApi.post(`${API.AUTH_PREFIX}/${API.AUTH_LOG_IN}`, data)

export const resetPass = data => clientApi.post(`${API.AUTH_PREFIX}/${API.AUTH_RESET}`, data)
