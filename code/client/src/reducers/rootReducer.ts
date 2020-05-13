import { createReducer, combineReducers } from '@reduxjs/toolkit';

import testReducer from './testReducer';

const initialState = {
  debug: true,
};

const rootReducer = createReducer(initialState, {});

export default combineReducers({
  ...rootReducer,
  test: testReducer,
});
