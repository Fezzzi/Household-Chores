import React from 'react'
import { PropTypes } from 'prop-types'

import { SeparatorWrapper, SeparatorLine, SeparatorText } from '../../styles/blocks/form'
import { LocaleText } from '../common'

const Separator = ({ message, line }) => (
  <SeparatorWrapper>
    {line && <SeparatorLine />}
    {message && (
      <SeparatorText>
        <LocaleText message={message} />
      </SeparatorText>
    )}
    {line && <SeparatorLine />}
  </SeparatorWrapper>
)

Separator.defaultProps = {
  line: true,
}

Separator.propTypes = {
  message: PropTypes.string,
  line: PropTypes.bool,
}

export default Separator
