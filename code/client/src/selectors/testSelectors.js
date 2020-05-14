import { createSelector } from '@reduxjs/toolkit';

// This functionality should be done simply as reducer, its done this way to serve as an example

const getDatabases = (state, action) => ({
  ...state,
  databases: Object.values(action.payload).map(value => value.Database),
});

const capitalize = arr =>
  arr.map(el => el.toUpperCase());

const capitalizeDatabases = state => ({
  ...state,
  databases: capitalize(state.databases),
});

export const dataLoaded = createSelector(
  getDatabases,
  capitalizeDatabases,
);
