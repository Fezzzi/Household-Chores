import React from 'react'
import PropTypes from 'prop-types'
import { Message } from '@material-ui/icons'

import { useConnectionButtons } from 'clientSrc/helpers/connectionButtons'
import {
  UserButtonsBox, UserName, UserNode, UserPhotoBox,
  UserPhoto, WrapperBox, AppendMessageAnchor, AppendMessageIcon,
} from 'clientSrc/styles/blocks/users'
import { SETTING_TABS, CONNECTION_STATE_TYPE } from 'shared/constants'

import PrimaryButton from '../../common/buttons/PrimaryButton'
import LocaleText from '../../common/LocaleText'
import { InfoTooltip } from '../../portals'

const UserConnectionNode = ({ tab, user }) => {
  const buttons = useConnectionButtons(tab, user)

  const handleClick = clickHandler => () => {
    /* todo: Implement connection messages and pass it here */
    clickHandler()
  }

  const { id, nickname, photo, state, message: userMessage } = user
  return (
    <WrapperBox>
      <UserNode>
        <UserPhotoBox>
          <UserPhoto src={photo} />
          {(tab === SETTING_TABS.FIND_CONNECTION || tab === SETTING_TABS.PENDING)
          && state === CONNECTION_STATE_TYPE.WAITING && userMessage && (
            <AppendMessageAnchor>
              <InfoTooltip
                icon={<AppendMessageIcon><Message /></AppendMessageIcon>}
                text={userMessage}
              />
            </AppendMessageAnchor>
          )}
        </UserPhotoBox>
        <UserName>{nickname}</UserName>
        <UserButtonsBox>
          {Object.keys(buttons).map(label => {
            const {
              active, message: buttonMessage, color, background, backgroundHover, disabled, clickHandler,
            } = buttons[label]
            return active && (
              <PrimaryButton
                key={`${id}-${label}`}
                disabled={disabled}
                onClick={handleClick(clickHandler)}
                margin="0 0 6px"
                color={color}
                background={background}
                backgroundHover={backgroundHover}
              >
                <LocaleText message={buttonMessage || label} />
              </PrimaryButton>
            )
          })}
        </UserButtonsBox>
      </UserNode>
    </WrapperBox>
  )
}

UserConnectionNode.propTypes = {
  tab: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    photo: PropTypes.string,
    date_created: PropTypes.string,
    message: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
}

export default UserConnectionNode
