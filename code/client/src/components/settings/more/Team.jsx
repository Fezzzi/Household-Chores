import React from 'react'

import FezziPhoto from '~/static/resources/team/Fezzi.jpg'

import { TeamList, TeamMember, TeamMemberDescription, TeamMemberText } from 'clientSrc/styles/blocks/settings'
import { FormHeaderPhoto } from 'clientSrc/styles/blocks/form'
import { LocaleText } from 'clientSrc/components/common'
import { MORE } from 'shared/constants/localeMessages'

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
