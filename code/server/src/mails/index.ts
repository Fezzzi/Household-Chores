import { LOCALE_CODES } from 'shared/constants'
import { MAILS } from 'serverSrc/constants'

import { ResetPassDataShape } from './en_US/resetPassword'
import * as resetPassEn from './en_US/resetPassword'
import * as resetPassCs from './cs_CZ/resetPassword'

export type EmailDataShape = ResetPassDataShape

export interface Email {
  getSubject: (data?: EmailDataShape) => string
  getText: (data: EmailDataShape) => string
  getHTML: (data: EmailDataShape) => string
}

export const mails: Record<string, Record<string, Email>> = {
  [LOCALE_CODES.CS]: {
    [MAILS.RESET_PASSWORD]: resetPassCs,
  },
  [LOCALE_CODES.EN]: {
    [MAILS.RESET_PASSWORD]: resetPassEn,
  },
}
