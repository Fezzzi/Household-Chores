import { createAction } from '@reduxjs/toolkit';

export const triggerThemeChange = createAction('TRIGGER_THEME_CHANGE');
export const changeTheme = createAction('CHANGE_THEME');
export const stopThemeTransition = createAction('STOP_THEME_TRANSITION');
