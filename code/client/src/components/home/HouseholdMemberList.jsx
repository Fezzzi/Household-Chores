import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Remove, Add } from '@material-ui/icons'

import { MEMBER_KEYS } from 'shared/constants/mappingKeys'
import {
  ExpandableMemberList, ExpandableMemberListBox, ExpandMemberListButton, HouseholdMemberName,
  HouseholdMemberNode, HouseholdMemberPhoto, HouseholdMemberRole,
} from 'clientSrc/styles/blocks/home'
import { getLabelColors } from 'clientSrc/helpers/household'

const HouseholdMemberList = ({ members }) => {
  const [expanded, setExpanded] = useState(false)

  const sortedMembers = useMemo(() => [...members].sort((a, b) =>
    a[MEMBER_KEYS.ROLE] < b[MEMBER_KEYS.ROLE] ? -1 : 1),
  [members])

  return (
    <ExpandableMemberListBox>
      <ExpandableMemberList>
        {sortedMembers.map((member, index) => {
          if (index >= 5 && !expanded) {
            return null
          }
          const { background, color } = getLabelColors(member[MEMBER_KEYS.ROLE])

          return (
            <HouseholdMemberNode
              key={`member-${index}`}
              borderColor={background}
            >
              <HouseholdMemberRole background={background} textColor={color}>
                {member[MEMBER_KEYS.ROLE]}
              </HouseholdMemberRole>
              <HouseholdMemberPhoto>
                <img src={member[MEMBER_KEYS.PHOTO]} alt="" />
              </HouseholdMemberPhoto>
              <HouseholdMemberName>{member[MEMBER_KEYS.NAME]}</HouseholdMemberName>
            </HouseholdMemberNode>
          )
        })}
        {sortedMembers.length > 4 && (
          <ExpandMemberListButton
            tabIndex={-1}
            onBlur={() => setExpanded(false)}
            onClick={() => setExpanded(prevState => !prevState)}
          >
            {expanded ? <Remove /> : <Add />}
          </ExpandMemberListButton>
        )}
      </ExpandableMemberList>
    </ExpandableMemberListBox>
  )
}

HouseholdMemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    [MEMBER_KEYS.NAME]: PropTypes.string,
    [MEMBER_KEYS.ROLE]: PropTypes.string,
    [MEMBER_KEYS.PHOTO]: PropTypes.string,
  })).isRequired,
}

export default HouseholdMemberList
