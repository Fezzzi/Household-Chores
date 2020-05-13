import { createSelector } from '@reduxjs/toolkit';

// This functionality should be done simply as reducer, its done this way to serve as an example

const getDatabases = (state: any, action: any): any => ({
  ...state,
  databases: Object.values(action.payload).map((value: any) => value.Database),
});

const capitalize = (arr: any) =>
  arr.map((el: string) => el.toUpperCase());

const capitalizeDatabases = (state: any) => ({
  ...state,
  databases: capitalize(state.databases),
});

export const dataLoaded = createSelector(
  getDatabases,
  capitalizeDatabases,
);
