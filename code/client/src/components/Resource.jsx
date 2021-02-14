import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PropTypes } from 'prop-types'
import { ArrowBack } from '@material-ui/icons'

import errorIcon from '~/static/resources/icons/error-icon.svg'

import { loadResource } from 'clientSrc/effects/resourceEffects'
import {
  ResourceWrapper, TopButton, BannerWrapper, BodyBlock,
  BodyWrapper, HeadlineBlock, IconBlock,
} from 'clientSrc/styles/blocks/resources'

const Resource = ({ match: { params: { resourceId } }, history }) => {
  const [data, setData] = useState({ headline: '', body: '' })
  const locale = useSelector(({ locale: { locale } }) => locale)

  const fetchData = (resourceId, locale) =>
    loadResource({
      resourceId,
      localeData: { locale },
    })
      .then(({ data }) => setData(data))
      .catch(() => setData({
        headline: 'Error',
        icon: errorIcon,
        body: 'Error loading data, please try refreshing the page.',
      }))

  useEffect(() => { fetchData(resourceId, locale) }, [resourceId, locale])

  const { headline, icon, banner, body } = data

  return (
    <ResourceWrapper>
      <TopButton onClick={() => history.goBack()}>
        <ArrowBack />
      </TopButton>
      {/* todo: add locale selection to top right / to bottom right corner of the banner */}
      <BannerWrapper banner={banner} />
      <BodyWrapper>
        <IconBlock icon={icon} />
        <HeadlineBlock>{headline}</HeadlineBlock>
        <BodyBlock dangerouslySetInnerHTML={{ __html: body }} />
      </BodyWrapper>
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
