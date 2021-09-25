import { AVAILABLE_MESSAGES, LOCALE_CODE } from '../constants'
import textsUS from './en_US'
import textsCZ from './cs_CZ'

const applicationTexts: Record<LOCALE_CODE, Record<AVAILABLE_MESSAGES, string>> = {
  [LOCALE_CODE.EN]: textsUS,
  [LOCALE_CODE.CS]: textsCZ,
} as const

export default applicationTexts
