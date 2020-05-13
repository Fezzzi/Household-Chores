import { createAction } from '@reduxjs/toolkit';

export const getData: any = createAction('GET_DATA');
export const clearData: any = createAction('CLEAR_DATA');
export const dataLoaded: any = createAction('DATA_LOADED');
