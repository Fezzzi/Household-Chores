import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { ArrowBack } from '@material-ui/icons';

import { loadResource } from 'clientSrc/effects/resourceEffects';
import {
  ResourceWrapper, TopButton, BannerWrapper, BodyBlock,
  BodyWrapper, HeadlineBlock, IconBlock,
} from 'clientSrc/styles/blocks/resources';
import errorIcon from '~/static/resources/icons/error-icon.svg';

class Resource extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { resourceId } } } = this.props;

    this.state = {
      data: {
        headline: '',
        body: '',
      },
      resourceId,
    };
  }

  fetchData(resourceId, locale) {
    loadResource({
      resourceId,
      localeData: { locale },
    }).then(({ data }) => this.setState({ data })
    ).catch(() => this.setState({
      data: {
        headline: 'Error',
        icon: errorIcon,
        body: 'Error loading data, please try refreshing the page.',
      },
    }));
  }

  componentDidMount() {
    const { locale } = this.props;
    const { resourceId } = this.state;

    this.fetchData(resourceId, locale);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { resourceId: prevResourceId } }, locale: prevLocale } = prevProps;
    const { locale } = this.props;
    const { resourceId } = this.state;

    if (prevResourceId !== resourceId || prevLocale !== locale) {
      this.fetchData(resourceId, locale);
    }
  }

  render() {
    const { history } = this.props;
    const { data: { headline, icon, banner, body } } = this.state;

    return (
      <ResourceWrapper>
        <TopButton onClick={() => history.goBack()}>
          <ArrowBack />
        </TopButton>
        <BannerWrapper banner={banner} />
        <BodyWrapper>
          <IconBlock icon={icon} />
          <HeadlineBlock>{headline}</HeadlineBlock>
          <BodyBlock dangerouslySetInnerHTML={{ __html: body }} />
        </BodyWrapper>
      </ResourceWrapper>
    );
  }
}

Resource.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      resourceId: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = ({ locale: { locale } }) => ({
  locale,
});

export default connect(mapStateToProps)(Resource);
