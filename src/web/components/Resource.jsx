import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'

import ErrorIcon from 'assets/icons/resource-error.svg'

import { ERROR } from 'shared/constants/localeMessages'
import { useCurrentLocale } from 'web/helpers/useCurrentLocale'

import { ArrowBackIcon } from '../styles/icons'
import {
  ResourceWrapper, TopButton, BannerWrapper, BodyBlock,
  BodyWrapper, HeadlineBlock, IconBlock, IconComponentBlock,
} from '../styles/blocks/resources'
import { loadResource } from '../effects/resourceEffects'
import { LocaleText } from './common'

const Resource = ({ match: { params: { resourceId } }, history }) => {
  const [data, setData] = useState({ headline: '', body: '' })
  const [error, setError] = useState(false)
  const locale = useCurrentLocale()

  const fetchData = (resourceId, locale) =>
    loadResource({
      resourceId,
      locale,
    })
      .then(({ data }) => setData(data))
      .catch(() => setError(true))

  useEffect(() => { fetchData(resourceId, locale) }, [resourceId, locale])

  const { headline, icon, banner, body } = data

  return (
    <ResourceWrapper>
      <TopButton onClick={() => history.goBack()}>
        <ArrowBackIcon />
      </TopButton>
      {/* todo: add locale selection to top right / to bottom right corner of the banner */}
      {error
        ? (
          <>
            <BannerWrapper />
            <BodyWrapper>
              <IconComponentBlock><ErrorIcon /></IconComponentBlock>
              <HeadlineBlock><LocaleText message={ERROR.ERROR} /></HeadlineBlock>
              <BodyBlock><LocaleText message={ERROR.CONNECTION_ERROR} /></BodyBlock>
            </BodyWrapper>
          </>
        ) : (
          <>
            <BannerWrapper banner={banner} />
            <BodyWrapper>
              <IconBlock icon={icon} />
              <HeadlineBlock>{headline}</HeadlineBlock>
              <BodyBlock dangerouslySetInnerHTML={{ __html: body }} />
            </BodyWrapper>
          </>
        )}
    </ResourceWrapper>
  )
}

Resource.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      resourceId: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.object.isRequired,
}

export default Resource
