import { LOCALE_CODES } from 'shared/constants'
import { EMAIL_TEMPLATE } from 'serverSrc/constants'

import { ResetPassDataShape, ActivityDataShape } from './dataShapes'
import * as resetPassEn from './en_US/resetPassword'
import * as activityEn from './en_US/activity'
import * as resetPassCs from './cs_CZ/resetPassword'
import * as activityCs from './cs_CZ/activity'

export type EmailTemplateDataShapeType = {
  [EMAIL_TEMPLATE.RESET_PASSWORD]: ResetPassDataShape
  [EMAIL_TEMPLATE.ACTIVITY]: ActivityDataShape
}

export type Email<T> = {
  getSubject: (data?: T) => string
  getText: (data: T) => string
  getHTML: (data: T) => string
}

export type EmailTemplatesType = { [key in keyof EmailTemplateDataShapeType]: Email<EmailTemplateDataShapeType[key]> }

export const mails: Record<string, EmailTemplatesType> = {
  [LOCALE_CODES.CS]: {
    [EMAIL_TEMPLATE.RESET_PASSWORD]: resetPassCs,
    [EMAIL_TEMPLATE.ACTIVITY]: activityCs,
  },
  [LOCALE_CODES.EN]: {
    [EMAIL_TEMPLATE.RESET_PASSWORD]: resetPassEn,
    [EMAIL_TEMPLATE.ACTIVITY]: activityEn,
  },
}
