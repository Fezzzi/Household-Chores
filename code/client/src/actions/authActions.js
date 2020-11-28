import { createAction } from '@reduxjs/toolkit'

export const signUp = createAction('SIGN_UP')
export const signUpSuccess = createAction('SIGN_UP_SUCCESS')

export const logIn = createAction('LOG_IN')
export const logInGoogle = createAction('LOG_IN_GOOGLE')
export const logInFacebook = createAction('LOG_IN_FACEBOOK')
export const logInSuccess = createAction('LOG_IN_SUCCESS')

export const resetPass = createAction('RESET_PASS')
export const resetPassSuccess = createAction('RESET_PASS_SUCCESS')
export const resetPassError = createAction('RESET_PASS_ERROR')
