import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Search, SortByAlpha, Add } from '@material-ui/icons'

import {
  InvitationFormButton, InvitationFormNode, InvitationFormNodeName, InvitationFormNodePhoto, InvitationNodesWrapper,
} from 'clientSrc/styles/blocks/households'
import { TableBox, TableHeaderBox, TableHeaderCell, TableSingleRowBox, TableSorterIcon } from 'clientSrc/styles/blocks/table'
import { useTableLogic } from 'clientSrc/helpers/table'
import { COMMON } from 'shared/constants/localeMessages'
import { CONNECTION_KEYS } from 'shared/constants/mappingKeys'

import { MiniTextInput } from '../../common'

const HouseholdInvitationForm = ({ connections, onInvite }) => {
  const { processedRows, setQuery, sorters } = useTableLogic(
    connections,
    [{ key: CONNECTION_KEYS.NICKNAME, icon: <SortByAlpha /> }],
    CONNECTION_KEYS.NICKNAME
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

  return (
    <TableBox>
      <TableHeaderBox>
        <TableHeaderCell growing>{sorters}</TableHeaderCell>
        <TableHeaderCell>
          <TableSorterIcon onClick={() => textInputRef.current.focus()}>
            <Search />
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
          {processedRows.map(({
            [CONNECTION_KEYS.ID]: id,
            [CONNECTION_KEYS.NICKNAME]: nickname,
            [CONNECTION_KEYS.PHOTO]: photo,
          }, index) => (
            <InvitationFormNode
              key={`connection-${id}`}
              onMouseEnter={() => setHoveredNode(index)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => {
                onInvite(id)
                setHoveredNode(null)
              }}
            >
              {hoveredNode === index && (<InvitationFormButton><Add /></InvitationFormButton>)}
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
    [CONNECTION_KEYS.ID]: PropTypes.number.isRequired,
    [CONNECTION_KEYS.NICKNAME]: PropTypes.string.isRequired,
    [CONNECTION_KEYS.PHOTO]: PropTypes.string,
  })).isRequired,
  onInvite: PropTypes.func.isRequired,
}

export default HouseholdInvitationForm
