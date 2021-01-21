import React from 'react'
import { useSelector } from 'react-redux'
import deepEqual from 'fast-deep-equal'

import { MODAL_TYPE } from 'clientSrc/constants'

import EditPhotoModal from './EditPhotoModal'
import ConfirmationModal from './ConfirmationModal'

const Modal = () => {
  const { type, data } = useSelector(({ modal }) => modal, deepEqual)

  switch (type) {
    case MODAL_TYPE.PHOTO_EDITOR:
      return <EditPhotoModal data={data} />
    case MODAL_TYPE.CONFIRMATION:
      return <ConfirmationModal data={data} />
    default:
      return ''
  }
}

export default Modal
