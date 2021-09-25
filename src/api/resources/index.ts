import { API, LOCALE_CODE } from 'shared/constants'

import notFoundEn from './en_US/not-found'
import tacEn from './en_US/terms-and-conditions'

import notFoundCs from './cs_CZ/not-found'
import tacCs from './cs_CZ/terms-and-conditions'

export interface Resource {
  headline: string
  body: string
  banner: string | null
  icon: string | null
}

export const resources: Record<string, Record<string, Resource>> = {
  [LOCALE_CODE.CS]: {
    [API.RESOURCE_NOT_FOUND]: notFoundCs,
    [API.RESOURCE_TAC]: tacCs,
  },
  [LOCALE_CODE.EN]: {
    [API.RESOURCE_NOT_FOUND]: notFoundEn,
    [API.RESOURCE_TAC]: tacEn,
  },
}
