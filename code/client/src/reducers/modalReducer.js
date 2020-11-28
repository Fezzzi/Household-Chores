import { createReducer } from '@reduxjs/toolkit'

import { ModalActions } from 'clientSrc/actions'

const initialState = {
  type: null,
  data: null,
}

const openModal = (_, { payload }) => payload

const closeModal = () => initialState

export default createReducer(initialState, {
  [ModalActions.openModal.toString()]: openModal,
  [ModalActions.closeModal.toString()]: closeModal,
})
