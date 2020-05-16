import { createReducer } from '@reduxjs/toolkit';

import * as TestActions from '../actions/testActions';
import { dataLoaded } from '../selectors/testSelectors';

const initialState = {
  databases: [],
};

const clearData = () => initialState;

export default createReducer(initialState, {
  [TestActions.clearData.toString()]: clearData,
  [TestActions.dataLoaded.toString()]: dataLoaded,
});
