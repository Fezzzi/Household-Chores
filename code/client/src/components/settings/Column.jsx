import React from 'react';
import PropTypes from 'prop-types';

import { SETTINGS } from 'shared/constants/localeMessages';
import { SettingsColumnWrapper, SettingIcon, SettingText, SettingsColumn, SettingRow } from 'clientSrc/styles/blocks/settings';
import LocaleText from 'clientSrc/components/common/LocaleText';

const Column = ({
  type, rows, primary, icons, width, selected,
  messages, types, modifiers, changeSelection, peekSelection,
}) => (
  <SettingsColumnWrapper width={width}>
    <SettingsColumn>
      {rows.map(row => (
        <SettingRow
          primary={primary}
          onClick={() => changeSelection(row)}
          onMouseEnter={() => row !== selected && peekSelection(row, true)}
          onMouseLeave={() => row !== selected && peekSelection(selected, false)}
          selected={selected === row}
          key={`column-${row}`}
        >
          {icons[row] || (types && icons[types[row]])
            ? (
              <SettingIcon primary={primary}>
                {icons[row] || (types && icons[types[row]])}
              </SettingIcon>
            )
            : ''}
          <SettingText>
            <LocaleText message={SETTINGS[`${type}_${row}`] || messages[row] || row} />
            {modifiers && modifiers(row)}
          </SettingText>
        </SettingRow>
      )
      )}
    </SettingsColumn>
  </SettingsColumnWrapper>
);

Column.defaultProps = {
  messages: {},
  peekSelection: () => {},
  modifiers: () => '',
};

Column.propTypes = {
  type: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  primary: PropTypes.bool.isRequired,
  icons: PropTypes.object,
  messages: PropTypes.object,
  types: PropTypes.object,
  width: PropTypes.string.isRequired,
  selected: PropTypes.string,
  modifiers: PropTypes.func,
  changeSelection: PropTypes.func.isRequired,
  peekSelection: PropTypes.func,
};

export default Column;
