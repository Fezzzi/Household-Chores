import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { loadResource } from 'clientSrc/effects/resourceEffects';

class Resource extends Component{
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
    ).catch(err => this.setState({
      data: {
        headline: 'Error',
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
    const { match: { params: { resourceId: prevResourceId }}, locale: prevLocale } = prevProps;
    const { locale } = this.props;
    const { resourceId } = this.state;

    if (prevResourceId !== resourceId || prevLocale !== locale) {
      this.fetchData(resourceId, locale);
    }
  }

  render() {
    const { data: { headline, icon, banner, body} } = this.state;

    return (
      <div>
        <h1>{headline}</h1>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    )
  }
}

Resource.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      resourceId: PropTypes.string.isRequired,
    }),
  }),
  locale: PropTypes.string.isRequired,
});

const mapStateToProps = ({ locale: { locale } }) => ({
  locale,
});

export default connect(mapStateToProps)(Resource);
