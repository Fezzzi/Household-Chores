import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { CONNECTION_STATE_TYPE, INVITATION_MESSAGE_LENGTH } from 'shared/constants'
import { FORM } from 'shared/constants/localeMessages'
import { COLORS, MODAL_TYPE, PORTAL_TYPE } from 'web/constants'
import { MessageIcon } from 'web/styles/icons'
import {
  SearchFormMessageAnchor, AppendMessageIcon, UserButtonsBox, UserList, UserMutualFriends,
  UserName, UserNode, UserPhoto, UserPhotoBox, WrapperBox,
} from 'web/styles/blocks/users'
import { FormBody, FormWrapper, SectionHeadline } from 'web/styles/blocks/settings'
import { TableBox, TableHeaderBox } from 'web/styles/blocks/table'
import { ConnectionActions, ModalActions } from 'web/actions'

import { LocaleText, PrimaryButton } from '../../common'
import { MessageTooltip } from '../../portals'
import SearchBar from '../SearchBar'

const ConnectionSearchForm = ({ data }) => {
  const dispatch = useDispatch()
  const searchQuery = useCallback(query =>
    dispatch(ConnectionActions.searchConnectionAction(query)),
  [dispatch])

  const connectHandler = useCallback((targetId, message) =>
    dispatch(ConnectionActions.connectionRequest({ targetId, message })),
  [dispatch])

  const handleClick = userId => () => dispatch(ModalActions.openModal({
    type: MODAL_TYPE.APPEND_MESSAGE,
    data: {
      maxLength: INVITATION_MESSAGE_LENGTH,
      onSubmit: message => connectHandler(userId, message),
    },
  }))

  const emptyResultMessage = useMemo(() => data?.length === 0
    ? FORM.NO_CONNECTIONS_FOUND
    : '',
  [data])

  return (
    <FormWrapper>
      <SectionHeadline first>
        <LocaleText message={FORM.FIND_CONNECTION} />
      </SectionHeadline>
      <TableBox>
        <TableHeaderBox isBigger>
          <SearchBar onSearch={searchQuery} />
        </TableHeaderBox>
      </TableBox>

      {data?.length
        ? (
          <UserList>
            {data.map(({ userId, nickname, photo, mutualConnections, state, message }) => (
              <WrapperBox key={`userResult-${userId}`}>
                <UserNode>
                  <UserPhotoBox>
                    <UserPhoto src={photo} />
                    {message && (
                      <SearchFormMessageAnchor>
                        <MessageTooltip
                          icon={<AppendMessageIcon><MessageIcon /></AppendMessageIcon>}
                          text={message}
                          customOffsetY={3}
                          customOffsetX={-10}
                          centered
                          scrollRoot="settingsWrapper"
                          type={PORTAL_TYPE.SETTINGS_TOOLTIPS}
                        />
                      </SearchFormMessageAnchor>
                    )}
                  </UserPhotoBox>
                  <UserName>{nickname}</UserName>
                  {mutualConnections > 0 && (
                    <UserMutualFriends>
                      ({mutualConnections} <LocaleText message={FORM.MUTUAL_FRIENDS} />)
                    </UserMutualFriends>
                  )}
                  <UserButtonsBox>
                    <PrimaryButton
                      disabled={state === CONNECTION_STATE_TYPE.WAITING}
                      onClick={handleClick(userId)}
                      margin="0 0 6px"
                      background={COLORS.BLUE_PRIMARY}
                      backgroundHover={COLORS.BLUE_SECONDARY}
                    >
                      <LocaleText message={state === CONNECTION_STATE_TYPE.WAITING && FORM.CONNECTION_SENT || FORM.CONNECT} />
                    </PrimaryButton>
                  </UserButtonsBox>
                </UserNode>
              </WrapperBox>
            ))}
          </UserList>
        ) : (
          <FormBody>
            <LocaleText message={emptyResultMessage} />
          </FormBody>
        )}
    </FormWrapper>
  )
}

ConnectionSearchForm.propTypes = {
  data: PropTypes.array,
}

export default ConnectionSearchForm
