import { createAction } from '@reduxjs/toolkit';

export const stateLoaded = createAction('STATE_LOADED');

export const addNotifications = createAction('ADD_NOTIFICATIONS');
export const removeNotification = createAction('REMOVE_NOTIFICATIONS');
