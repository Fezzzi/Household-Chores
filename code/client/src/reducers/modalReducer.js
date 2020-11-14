import { createReducer } from '@reduxjs/toolkit';

import * as ModalActions from 'clientSrc/actions/modalActions';

const initialState = {
  type: null,
  data: null,
};

const openModal = (_, { payload }) => payload;

const closeModal = () => initialState;


export default createReducer(initialState, {
  [ModalActions.openModal.toString()]: openModal,
  [ModalActions.closeModal.toString()]: closeModal,
});
