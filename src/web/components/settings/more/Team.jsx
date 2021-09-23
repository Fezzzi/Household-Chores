import React from 'react'

import FezziPhoto from 'assets/images/team/Fezzi.jpg'

import { MORE } from 'shared/constants/localeMessages'
import { TeamList, TeamMember, TeamMemberDescription, TeamMemberText } from 'web/styles/blocks/settings'
import { FormHeaderPhoto } from 'web/styles/blocks/form'

import { LocaleText } from '../../common'

const Team = () => (
  <TeamList>
    <TeamMember>
      <FormHeaderPhoto src={FezziPhoto} />
      <TeamMemberDescription>
        <h2>Filip Horký</h2>
        <TeamMemberText>
          <LocaleText message={MORE.FEZZI} />
        </TeamMemberText>
      </TeamMemberDescription>
    </TeamMember>
  </TeamList>
)

export default Team
