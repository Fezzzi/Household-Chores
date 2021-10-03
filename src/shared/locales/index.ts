import { AVAILABLE_MESSAGES, LOCALE_CODE } from '../constants'
import textsUS from './en_US'
import textsCZ from './cs_CZ'

export type LocalizedApplicationTexts = Record<AVAILABLE_MESSAGES, string>
export const applicationTexts: Record<LOCALE_CODE, LocalizedApplicationTexts> = {
  [LOCALE_CODE.EN]: textsUS,
  [LOCALE_CODE.CS]: textsCZ,
} as const
