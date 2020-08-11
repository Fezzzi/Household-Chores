import React from 'react';
import PropTypes from 'prop-types';

import { SETTINGS } from 'shared/constants/localeMessages';
import { SettingsColumn, SettingRow } from 'clientSrc/styles/blocks/settings';
import LocaleText from 'clientSrc/components/common/LocaleText';

const Column = ({ type, rows, primary, width, selected, changeSelection, peekSelection = () => {} }) => (
  <SettingsColumn width={width}>
    {rows.map(row =>
      <SettingRow
        primary={primary}
        onClick={() => changeSelection(row)}
        onMouseEnter={() => peekSelection(row)}
        onMouseLeave={() => peekSelection(selected)}
        selected={selected === row}
        key={`column-${row}`}
      >
        <LocaleText message={SETTINGS[`${type}_${row}`]} />
      </SettingRow>
    )}
  </SettingsColumn>
);

Column.propTypes = ({
  type: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  changeSelection: PropTypes.func.isRequired,
  peekSelection: PropTypes.func,
});

export default Column;
