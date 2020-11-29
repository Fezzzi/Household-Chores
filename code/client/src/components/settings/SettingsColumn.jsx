import React from 'react'
import PropTypes from 'prop-types'

import { SETTINGS } from 'shared/constants/localeMessages'
import { ColumnWrapper, SettingIcon, SettingText, Column, SettingRow } from 'clientSrc/styles/blocks/settings'

import { LocaleText } from '../common'

const SettingsColumn = ({
  type, rows, primary, icons, width, selected,
  messages, types, modifiers, changeSelection, peekSelection,
}) => (
  <ColumnWrapper width={width}>
    <Column>
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
    </Column>
  </ColumnWrapper>
)

SettingsColumn.defaultProps = {
  messages: {},
  peekSelection: () => {},
  modifiers: () => '',
}

SettingsColumn.propTypes = {
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
}

export default SettingsColumn
