import React from 'react'

import { FORM } from 'shared/constants/localeMessages'
import { LocaleText, PrimaryButton } from 'web/components/common'
import { COLORS } from 'web/constants'

const BUTTONS_CONFIG = {
  [FORM.CONNECT]: {
    background: COLORS.BLUE_PRIMARY,
    backgroundHover: COLORS.BLUE_SECONDARY,
  },
  [FORM.APPROVE]: {
    background: COLORS.BLUE_PRIMARY,
    backgroundHover: COLORS.BLUE_SECONDARY,
  },
  [FORM.IGNORE]: {
    color: COLORS.FONT,
    background: COLORS.LIGHT_PRIMARY,
    backgroundHover: COLORS.LIGHT_SECONDARY,
  },
  [FORM.REMOVE]: {
    color: COLORS.FONT,
    background: COLORS.LIGHT_PRIMARY,
    backgroundHover: COLORS.LIGHT_SECONDARY,
  },
  [FORM.BLOCK]: {
    background: COLORS.RED_PRIMARY,
    backgroundHover: COLORS.RED_SECONDARY,
  },
  [FORM.UNBLOCK]: {
    background: COLORS.GREEN_PRIMARY,
    backgroundHover: COLORS.GREEN_SECONDARY,
  },
}

export const getButtonForUser = (label, userId, clickHandler) => {
  const { color, background, backgroundHover } = BUTTONS_CONFIG[label]
  return (
    <PrimaryButton
      onClick={() => clickHandler(userId)}
      margin="2px 0 1px"
      color={color}
      background={background}
      backgroundHover={backgroundHover}
    >
      <LocaleText message={label} />
    </PrimaryButton>
  )
}
