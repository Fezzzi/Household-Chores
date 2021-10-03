import React from 'react'

import { AVAILABLE_MESSAGES } from 'shared/constants'
import { COMMON, TIME } from 'shared/constants/localeMessages'
import { LocaleText } from 'web/components/common'

const formatTime = (timeStr: number, timeMessage: AVAILABLE_MESSAGES) => (
  <>
    <LocaleText message={COMMON.TIME_PREFIX} modifierFunc={val => val && `${val} `} />
    {timeStr} <LocaleText message={timeMessage} />
    <LocaleText message={COMMON.TIME_SUFFIX} modifierFunc={val => val && ` ${val}`} />
  </>
)

const HOUR_SECONDS = 3600
const DAY_SECONDS = 86400
const WEEK_SECONDS = 604800
const YEAR_SECONDS = 31556952

interface FormattedTimeProps {
  time: Date
  abbrevited?: boolean
}

export const FormattedTime = ({ time, abbrevited = false }: FormattedTimeProps) => {
  const diff = Math.round((new Date().getTime() - new Date(time).getTime()) / 1000)

  const selectMessage = (quantity: number, abbrevitation: string, singular: string, plural: string) => abbrevited
    ? abbrevitation
    : quantity === 1
      ? singular
      : plural

  if (diff < 60) {
    return formatTime(diff, selectMessage(diff, TIME.SECONDS_SHORT, TIME.SECOND, TIME.SECONDS))
  } else if (diff < HOUR_SECONDS) {
    return formatTime(Math.round(diff / 60), selectMessage(diff, TIME.MINUTES_SHORT, TIME.MINUTE, TIME.MINUTES))
  } else if (diff < DAY_SECONDS) {
    return formatTime(Math.round(diff / HOUR_SECONDS), selectMessage(diff, TIME.HOURS_SHORT, TIME.HOUR, TIME.HOURS))
  } else if (diff < WEEK_SECONDS) {
    return formatTime(Math.round(diff / DAY_SECONDS), selectMessage(diff, TIME.DAYS_SHORT, TIME.DAY, TIME.DAYS))
  } else if (diff < YEAR_SECONDS) {
    return formatTime(Math.round(diff / WEEK_SECONDS), selectMessage(diff, TIME.WEEKS_SHORT, TIME.WEEK, TIME.WEEKS))
  }
  return formatTime(Math.round(diff / YEAR_SECONDS), selectMessage(diff, TIME.YEARS_SHORT, TIME.YEAR, TIME.YEARS))
}
