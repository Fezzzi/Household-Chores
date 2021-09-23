import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { COMMON } from 'shared/constants/localeMessages'
import { INVITATION_MESSAGE_LENGTH } from 'shared/constants'
import { MODAL_TYPE } from 'web/constants'
import { SearchIcon, PlusIcon, SortAlphaIcon } from 'web/styles/icons'
import {
  InvitationFormButton, InvitationFormNode, InvitationFormNodeName, InvitationFormNodePhoto, InvitationNodesWrapper,
} from 'web/styles/blocks/households'
import { TableBox, TableHeaderBox, TableHeaderCell, TableSingleRowBox, TableSorterIcon } from 'web/styles/blocks/table'
import { ModalActions } from 'web/actions'
import { useTableLogic } from 'web/helpers/table'

import { MiniTextInput } from '../../common'

const HouseholdInvitationForm = ({ connections, onInvite }) => {
  const { processedRows, setQuery, sorters } = useTableLogic(
    connections,
    [{ key: 'nickname', icon: <SortAlphaIcon /> }],
    'nickname'
  )

  const textInputRef = useRef(null)
  const nodesRef = useRef([])

  const [hoveredNode, setHoveredNode] = useState(null)

  useEffect(() => {
    nodesRef.current = nodesRef.current.slice(0, processedRows.length)
  }, [processedRows])

  useLayoutEffect(() => {
    if (nodesRef.current) {
      nodesRef.current.forEach(node => {
        if (node) {
          let fontSize = Number.parseFloat(getComputedStyle(node)['font-size'])
          while (node.clientHeight >= 60 && fontSize > 6) {
            fontSize -= 1
            node.style.fontSize = `${fontSize}px`
            node.style.lineHeight = `${fontSize}px`
          }
        }
      })
    }
  }, [nodesRef.current, processedRows])

  const dispatch = useDispatch()
  const handleInvitationClick = userId => dispatch(ModalActions.openModal({
    type: MODAL_TYPE.APPEND_MESSAGE,
    data: {
      maxLength: INVITATION_MESSAGE_LENGTH,
      onSubmit: message => {
        onInvite(userId, message)
        setHoveredNode(null)
      },
    },
  }))

  return (
    <TableBox>
      <TableHeaderBox>
        <TableHeaderCell growing>{sorters}</TableHeaderCell>
        <TableHeaderCell>
          <TableSorterIcon onClick={() => textInputRef.current.focus()}>
            <SearchIcon />
          </TableSorterIcon>
          <MiniTextInput
            reference={textInputRef}
            name="table-filter"
            value={COMMON.SEARCH}
            handleChange={setQuery}
          />
        </TableHeaderCell>
      </TableHeaderBox>
      <TableSingleRowBox height={connections.length ? '130px' : '0px'}>
        <InvitationNodesWrapper>
          {processedRows.map(({ userId, nickname, photo }, index) => (
            <InvitationFormNode
              key={`connection-${userId}`}
              onMouseEnter={() => setHoveredNode(index)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleInvitationClick(userId)}
            >
              {hoveredNode === index && (<InvitationFormButton><PlusIcon /></InvitationFormButton>)}
              <InvitationFormNodePhoto src={photo} />
              <InvitationFormNodeName ref={node => nodesRef.current[index] = node}>{nickname}</InvitationFormNodeName>
            </InvitationFormNode>
          ))}
        </InvitationNodesWrapper>
      </TableSingleRowBox>
    </TableBox>
  )
}

HouseholdInvitationForm.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    photo: PropTypes.string,
  })).isRequired,
  onInvite: PropTypes.func.isRequired,
}

export default HouseholdInvitationForm
