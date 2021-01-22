import React from 'react'
import { useSelector } from 'react-redux'
import deepEqual from 'fast-deep-equal'

import { MODAL_TYPE } from 'clientSrc/constants'

import EditPhotoModal from './EditPhotoModal'
import ConfirmationModal from './ConfirmationModal'
import TutorialModal from './TutorialModal'
import InvitationAcceptModal from './InvitationAcceptModal'

const Modal = () => {
  const modals = useSelector(({ modal }) => modal, deepEqual)

  const getModalComponent = (type, data) => {
    switch (type) {
      case MODAL_TYPE.PHOTO_EDITOR:
        return <EditPhotoModal data={data} />
      case MODAL_TYPE.CONFIRMATION:
        return <ConfirmationModal data={data} />
      case MODAL_TYPE.TUTORIAL:
        return <TutorialModal />
      case MODAL_TYPE.INVITATION_ACCEPT:
        return <InvitationAcceptModal data={data} />
      default:
        return ''
    }
  }

  return (
    <>
      {modals.map(({ type, data }, index) => (
        <React.Fragment key={`modal-${index}`}>
          {getModalComponent(type, data)}
        </React.Fragment>
      ))}
    </>
  )
}

export default Modal
