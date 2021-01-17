import React from 'react'

import { LocaleText, PrimaryButton } from 'clientSrc/components/common'
import { COLORS } from 'clientSrc/constants'
import { COMMON, FORM } from 'shared/constants/localeMessages'

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

const formatTime = timeStr => (
  <>
    <LocaleText message={COMMON.TIME_PREFIX} modifierFunc={val => val && `${val} `} />
    {timeStr}
    <LocaleText message={COMMON.TIME_SUFFIX} modifierFunc={val => val && ` ${val}`} />
  </>
)

const HOUR_SECONDS = 3600
const DAY_SECONDS = 86400
const WEEK_SECONDS = 604800
const YEAR_SECONDS = 31556952

export const getTimeString = time => {
  const diff = Math.round((new Date().getTime() - new Date(time).getTime()) / 1000)
  if (diff < 60) {
    return formatTime(`${diff}s`)
  } else if (diff < HOUR_SECONDS) {
    return formatTime(`${Math.round(diff / 60)}min`)
  } else if (diff < DAY_SECONDS) {
    return formatTime(`${Math.round(diff / HOUR_SECONDS)}h`)
  } else if (diff < WEEK_SECONDS) {
    return formatTime(`${Math.round(diff / DAY_SECONDS)}d`)
  } else if (diff < YEAR_SECONDS) {
    return formatTime(`${Math.round(diff / WEEK_SECONDS)}w`)
  }
  return formatTime(`${Math.round(diff / YEAR_SECONDS)}y`)
}

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
