import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { LABELS } from 'shared/constants/locale';
import { FLAGS } from 'clientSrc/constants/localeFlags';
import * as LocaleActions from 'clientSrc/actions/localeActions';
import {
  IconButtonWrapper, IconButton, LocaleIcon,
  LocaleLabel, LocaleSelector, LocaleLine,
} from 'clientSrc/styles/blocks/settings';

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
      inputActive: false,
    });
  }

  render() {
    const { locale, availableLocales, switchLocale } = this.props;
    const { expanded, inputActive } = this.state;

    return (
      <IconButtonWrapper>
        <IconButton
          active={inputActive}
          onClick={() => this.setState({
            expanded: !expanded,
            inputActive: true,
          })}
          onBlur={() => this.setState({
            expanded: false,
            inputActive: false,
          })}
        >
          <LocaleSelector hidden={!expanded}>
            {renderAvailableLocales(availableLocales.filter(l => l !== locale), switchLocale)}
          </LocaleSelector>
          {FLAGS[locale]()}
        </IconButton>
      </IconButtonWrapper>
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
