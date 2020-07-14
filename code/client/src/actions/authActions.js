import { createAction } from '@reduxjs/toolkit';

export const signUp = createAction('SIGN_UP');
export const signUpFacebook = createAction('SIGN_UP_FACEBOOK');
export const signUpSuccess = createAction('SIGN_UP_SUCCESS');
export const signUpError = createAction('SIGN_UP_ERROR');

export const logIn = createAction('LOG_IN');
export const logInGoogle = createAction('LOG_IN_GOOGLE');
export const logInFacebook = createAction('LOG_IN_FACEBOOK');
export const logInSuccess = createAction('LOG_IN_SUCCESS');
export const logInError = createAction('LOG_IN_ERROR');

export const resetPass = createAction('RESET_PASS');
export const resetPassSuccess = createAction('RESET_PASS_SUCCESS');
export const resetPassError = createAction('RESET_PASS_ERROR');
