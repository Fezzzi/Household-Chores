import { createReducer } from '@reduxjs/toolkit'

import { ModalActions } from 'clientSrc/actions'

/**
 * @type {[{ type: string, data: any }]}
 */
const initialState = []

const openModal = (state, { payload }) => {
  state.push(payload)
  return state
}

const closeModal = state => {
  state.pop()
  return state
}

export default createReducer(initialState, {
  [ModalActions.openModal.toString()]: openModal,
  [ModalActions.closeModal.toString()]: closeModal,
})
