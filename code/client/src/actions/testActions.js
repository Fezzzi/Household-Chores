import { createAction } from '@reduxjs/toolkit';

export const getData = createAction('GET_DATA');
export const clearData = createAction('CLEAR_DATA');
export const dataLoaded = createAction('DATA_LOADED');
