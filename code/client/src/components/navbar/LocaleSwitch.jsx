import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { LABELS } from 'shared/constants/locale';
import { FLAGS } from 'clientSrc/constants/localeFlags';
import * as LocaleActions from 'clientSrc/actions/localeActions';
import { IconButton, LocaleIcon, LocaleLabel, LocaleSelector, LocaleLine } from 'clientSrc/styles/blocks/navbar';

const renderAvailableLocales = (availableLocales, switchFunc) =>
  availableLocales.map((locale, key) => (
    <LocaleLine key={`locale-${key}`} onClick={() => switchFunc(locale)}>
      <LocaleIcon>
        {FLAGS[locale]()}
      </LocaleIcon>
      <LocaleLabel>
        {LABELS[locale]}
      </LocaleLabel>
    </LocaleLine>
  ));

class LocaleSwitchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      expanded: false,
    });
  }

  render() {
    const { locale, availableLocales, switchLocale } = this.props;
    const { expanded } = this.state;

    return (
      <IconButton onClick={() => this.setState({ expanded: !expanded })} onBlur={() => this.setState({ expanded: false })}>
        <LocaleSelector hidden={!expanded}>
          {renderAvailableLocales(availableLocales.filter(l => l !== locale), switchLocale)}
        </LocaleSelector>
        {FLAGS[locale]()}
      </IconButton>
    );
  }
}

LocaleSwitchComponent.propTypes = ({
  locale: PropTypes.string,
  availableLocales: PropTypes.arrayOf(PropTypes.string),
  switchLocale: PropTypes.func,
});

const mapStateToProps = ({ locale: { locale, availableLocales } }) => ({
  locale,
  availableLocales,
});

const mapDispatchToProps = dispatch => ({
  switchLocale: locale => dispatch(LocaleActions.triggerLocaleChange(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSwitchComponent);
