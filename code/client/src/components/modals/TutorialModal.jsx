import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { ModalActions, DialogActions } from 'clientSrc/actions'
import {
  ModalBody, ModalButtonsBlock, ModalOverlay,
} from 'clientSrc/styles/blocks/modals'
import { LocaleText, PrimaryButton } from 'clientSrc/components/common'
import { COLORS } from 'clientSrc/constants'
import { COMMON } from 'shared/constants/localeMessages'
import { DIALOG_KEYS } from 'shared/constants/settingsDataKeys'

const TutorialModal = () => {
  const TUTORIAL_PAGES = 3
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const closeModal = useCallback(() => {
    dispatch(DialogActions.disableDialog(DIALOG_KEYS.TUTORIAL))
    dispatch(ModalActions.closeModal())
  }, [dispatch])

  return (
    <ModalOverlay>
      <ModalBody width="100%" height="fill-available" margin="0" background="rgba(0, 0, 0, 0.5)">
        TUTORIAL PAGE {page}

        <ModalButtonsBlock>
          {page > 1 && (
            <PrimaryButton
              onClick={() => setPage(prevState => prevState - 1)}
              background={COLORS.LIGHT_PRIMARY}
              backgroundHover={COLORS.LIGHT_SECONDARY}
              color={COLORS.FONT}
            >
              <LocaleText message={COMMON.BACK} />
            </PrimaryButton>
          )}
          {page < TUTORIAL_PAGES && (
            <PrimaryButton
              onClick={() => setPage(prevState => prevState + 1)}
              background={COLORS.BLUE_PRIMARY}
              backgroundHover={COLORS.BLUE_SECONDARY}
            >
              <LocaleText message={COMMON.CONTINUE} />
            </PrimaryButton>
          )}
          {page === TUTORIAL_PAGES && (
            <PrimaryButton
              onClick={closeModal}
              background={COLORS.GREEN_PRIMARY}
              backgroundHover={COLORS.GREEN_PRIMARY}
            >
              <LocaleText message={COMMON.FINISH} />
            </PrimaryButton>
          )}
        </ModalButtonsBlock>
      </ModalBody>
    </ModalOverlay>
  )
}

export default TutorialModal
