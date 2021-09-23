import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { PlusIcon, MinusIcon } from '../../styles/icons'
import {
  ExpandableMemberList, ExpandableMemberListBox, ExpandMemberListButton, HouseholdMemberName,
  HouseholdMemberNode, HouseholdMemberPhoto, HouseholdMemberRole,
} from '../../styles/blocks/home'
import { getLabelColors } from '../../helpers/household'

const HouseholdMemberList = ({ members }) => {
  const [expanded, setExpanded] = useState(false)

  const sortedMembers = useMemo(() => [...members].sort((a, b) =>
    a.role < b.role ? -1 : 1),
  [members])

  return (
    <ExpandableMemberListBox>
      <ExpandableMemberList>
        {sortedMembers.map(({ role, photo, nickname }, index) => {
          if (index >= 5 && !expanded) {
            return null
          }
          const { background, color } = getLabelColors(role)

          return (
            <HouseholdMemberNode
              key={`member-${index}`}
              borderColor={background}
            >
              <HouseholdMemberRole background={background} textColor={color}>
                {role}
              </HouseholdMemberRole>
              <HouseholdMemberPhoto>
                <img src={photo} alt="" />
              </HouseholdMemberPhoto>
              <HouseholdMemberName>{nickname}</HouseholdMemberName>
            </HouseholdMemberNode>
          )
        })}
        {sortedMembers.length > 4 && (
          <ExpandMemberListButton
            tabIndex={-1}
            onBlur={() => setExpanded(false)}
            onClick={() => setExpanded(prevState => !prevState)}
          >
            {expanded ? <MinusIcon /> : <PlusIcon />}
          </ExpandMemberListButton>
        )}
      </ExpandableMemberList>
    </ExpandableMemberListBox>
  )
}

HouseholdMemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    nickname: PropTypes.string,
    role: PropTypes.string,
    photo: PropTypes.string,
  })).isRequired,
}

export default HouseholdMemberList
