import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { CalendarToday, Group, Message, SortByAlpha } from '@material-ui/icons'

import { SettingsActions } from 'clientSrc/actions'
import { connectionUnblock } from 'clientSrc/effects/conectionEffects'
import { AppendMessageAnchor, AppendMessageIcon } from 'clientSrc/styles/blocks/users'
import { FormBody, FormWrapper, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBigPhoto } from 'clientSrc/styles/blocks/table'
import { InfoTooltip } from 'clientSrc/components/portals'
import { getButtonForUser, getTimeString } from 'clientSrc/helpers/connections'
import { FORM } from 'shared/constants/localeMessages'

import { LocaleText, Table } from '../../common'

const ConnectionBlocksForm = ({ data }) => {
  const dispatch = useDispatch()

  const unblockHandler = useCallback(targetId =>
    dispatch(SettingsActions.connectionAction({ effect: connectionUnblock, targetId })),
  [dispatch])

  return (
    <FormWrapper>
      <SectionHeadline first>
        <LocaleText
          message={FORM.BLOCKED_CONNECTIONS}
          modifierFunc={data?.length ? text => `${text} (${data.length})` : undefined}
        />
      </SectionHeadline>
      {data?.length
        ? <Table
          rows={data.map(({
            id,
            photo,
            message,
            mutualConnections,
            dateCreated,
          }) => ({
            photo: <TableBigPhoto src={photo} />,
            mutualConnections: <>({mutualConnections} <LocaleText message={FORM.MUTUAL_FRIENDS} />)</>,
            message: message && (
              <AppendMessageAnchor>
                <InfoTooltip
                  icon={<AppendMessageIcon><Message /></AppendMessageIcon>}
                  text={message}
                  customHeight={24}
                  customOffsetY={-5}
                />
              </AppendMessageAnchor>
            ),
            dateCreated: getTimeString(dateCreated),
            unblockBtn: getButtonForUser(FORM.UNBLOCK, id, unblockHandler),
          }))}
          keys={[
            { name: 'photo' },
            { name: 'nickname', bold: true },
            { name: 'mutualConnections', fading: true, growing: true },
            { name: 'message' },
            { name: 'dateCreated', fading: true },
            { name: 'unblockBtn' },
          ]}
          sortConfig={[
            { key: 'nickname', icon: <SortByAlpha /> },
            { key: 'dateCreated', icon: <CalendarToday /> },
            { key: 'mutualConnections', icon: <Group /> },
          ]}
          defaultSorter={-2}
          filterKey="nickname"
          bigCells
          freeHeight
        />
        : (
          <FormBody>
            <LocaleText message={FORM.NO_BLOCKED_CONNECTIONS} />
          </FormBody>
        )}
    </FormWrapper>
  )
}

ConnectionBlocksForm.propTypes = {
  data: PropTypes.array,
}

export default ConnectionBlocksForm
