import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { COMMON, MORE } from 'shared/constants/localeMessages'
import {
  SectionHeadline, ContributorsCentered, Contributor, ContributorsMore, SectionHeadlineNote, AboutApplicationText,
} from 'web/styles/blocks/settings'

import { LocaleText } from '../../common'
import Team from './Team'

const AboutPage = ({ contributors, supporters }) => {
  const [expandedContributors, setExpandedContributors] = useState(false)

  return (
    <>
      <SectionHeadline first>
        <LocaleText message={MORE.ABOUT_THE_APPLICATION} />
      </SectionHeadline>
      <AboutApplicationText>
        <LocaleText message={MORE.ABOUT_TEXT} />
      </AboutApplicationText>

      <SectionHeadline>
        <LocaleText message={MORE.TEAM} />
      </SectionHeadline>
      <Team />

      <SectionHeadline>
        <LocaleText message={MORE.SUPPORTERS} />
        <SectionHeadlineNote>
          {supporters.length} <LocaleText message={MORE.SUPPORTERS} modifierFunc={text => text.toLowerCase()} />
        </SectionHeadlineNote>
      </SectionHeadline>
      {
        // todo: Implement supporters page after creating patreon page and having access to API
      }

      <SectionHeadline>
        <LocaleText message={MORE.CONTRIBUTORS} />
        <SectionHeadlineNote>
          {contributors.length} <LocaleText message={COMMON.CONTRIBUTORS} />
        </SectionHeadlineNote>
      </SectionHeadline>
      <ContributorsCentered>
        {contributors.map((contributor, index) => (index < 8 || expandedContributors) && (
          <Contributor key={`contributor-${contributor.name}-${index}`} href={contributor.link} target="_blank">
            <img src={contributor.photo} alt={contributor.name} title={contributor.name} />
          </Contributor>
        ))}
        {contributors.length > 8 && (
          <ContributorsMore onClick={() => setExpandedContributors(prevState => !prevState)}>
            {expandedContributors
              ? <LocaleText message={COMMON.HIDE} modifierFunc={text => text.toLowerCase()} />
              : <LocaleText message={COMMON.AND_X_MORE} modifierFunc={text => text.replace('@', contributors.length - 8)} />}
          </ContributorsMore>
        )}
      </ContributorsCentered>
    </>
  )
}

AboutPage.defaultProps = {
  contributors: [],
  supporters: [],
}

AboutPage.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.object),
  supporters: PropTypes.arrayOf(PropTypes.object),
}

export default AboutPage

