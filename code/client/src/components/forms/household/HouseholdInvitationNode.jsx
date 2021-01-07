import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Message } from '@material-ui/icons'

import { COLORS } from 'clientSrc/constants'
import {
  UserButtonsBox, UserName, UserNode, UserPhotoBox, UserPhoto, AppendMessageIcon, WrapperBox,
  AppendMessageAnchor, UserPhotoMoreBox, MiniUserName, MiniUserPhoto, UserFloatingNameBox,
} from 'clientSrc/styles/blocks/users'
import { HouseholdActions } from 'clientSrc/actions'
import { FORM } from 'shared/constants/localeMessages'
import { INVITATION_KEYS, HOUSEHOLD_KEYS, PROFILE } from 'shared/constants/settingsDataKeys'

import { PrimaryButton, LocaleText } from '../../common'
import { InfoTooltip } from '../../portals'

const HouseholdInvitationNode = ({ invitation: {
  [INVITATION_KEYS.FROM_ID]: fromId,
  [INVITATION_KEYS.FROM_NICKNAME]: fromNickname,
  [INVITATION_KEYS.FROM_PHOTO]: fromPhoto,
  [INVITATION_KEYS.HOUSEHOLD_ID]: householdId,
  [INVITATION_KEYS.HOUSEHOLD_NAME]: householdName,
  [INVITATION_KEYS.MESSAGE]: invitationMessage,
  [INVITATION_KEYS.HOUSEHOLD_PHOTO]: householdPhoto,
} }) => {
  const dispatch = useDispatch()

  const {
    [PROFILE.PHOTO]: photo,
    [PROFILE.NAME]: name,
  } = useSelector(({ app: { user } }) => user)

  const approveHandler = useCallback(() =>
    dispatch(HouseholdActions.approveInvitation({
      [INVITATION_KEYS.HOUSEHOLD_ID]: householdId,
      [INVITATION_KEYS.FROM_ID]: fromId,
      [HOUSEHOLD_KEYS.USER_NAME]: name,
      [HOUSEHOLD_KEYS.USER_PHOTO]: photo,
    })),
  [name, photo, dispatch])

  const removeHandler = useCallback(() =>
    dispatch(HouseholdActions.ignoreInvitation({
      [INVITATION_KEYS.HOUSEHOLD_ID]: householdId,
      [INVITATION_KEYS.FROM_ID]: fromId,
    })),
  [dispatch])

  return (
    <WrapperBox>
      <UserNode>
        <UserPhotoBox>
          <UserPhotoMoreBox>
            <UserFloatingNameBox>
              <MiniUserName title={fromNickname}>{fromNickname}</MiniUserName>
            </UserFloatingNameBox>
            <MiniUserPhoto src={fromPhoto} />
          </UserPhotoMoreBox>
          <UserPhoto src={householdPhoto} />
          {invitationMessage && (
            <AppendMessageAnchor>
              <InfoTooltip
                icon={<AppendMessageIcon><Message /></AppendMessageIcon>}
                text={invitationMessage}
              />
            </AppendMessageAnchor>
          )}
        </UserPhotoBox>
        <UserName>{householdName}</UserName>
        <UserButtonsBox>
          <PrimaryButton
            onClick={approveHandler}
            margin="0 0 6px"
            background={COLORS.BLUE_PRIMARY}
            backgroundHover={COLORS.BLUE_SECONDARY}
          >
            <LocaleText message={FORM.CONNECTION_APPROVE} />
          </PrimaryButton>
          <PrimaryButton
            onClick={removeHandler}
            margin="0 0 6px"
            color={COLORS.FONT}
            background={COLORS.LIGHT_PRIMARY}
            backgroundHover={COLORS.LIGHT_SECONDARY}
          >
            <LocaleText message={FORM.CONNECTION_IGNORE} />
          </PrimaryButton>
        </UserButtonsBox>
      </UserNode>
    </WrapperBox>
  )
}

HouseholdInvitationNode.propTypes = {
  invitation: PropTypes.shape({
    [INVITATION_KEYS.FROM_ID]: PropTypes.number.isRequired,
    [INVITATION_KEYS.FROM_NICKNAME]: PropTypes.string.isRequired,
    [INVITATION_KEYS.FROM_PHOTO]: PropTypes.string.isRequired,
    [INVITATION_KEYS.HOUSEHOLD_ID]: PropTypes.number.isRequired,
    [INVITATION_KEYS.HOUSEHOLD_NAME]: PropTypes.string.isRequired,
    [INVITATION_KEYS.MESSAGE]: PropTypes.string,
    [INVITATION_KEYS.HOUSEHOLD_PHOTO]: PropTypes.string,
  }).isRequired,
}

export default HouseholdInvitationNode
