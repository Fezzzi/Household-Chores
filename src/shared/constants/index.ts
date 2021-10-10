import * as API from './api'
import * as CONNECTION_STATE_TYPE from './connectionStateType'
import * as HOUSEHOLD_ROLE_TYPE from './householdRoleType'
import * as INPUT_TYPE from './inputType'
import * as LINKS from './links'
import * as MESSAGES from './localeMessages'

export * from './locale'
export * from './common'
export * from './settings'
export * from './notificationType'
export * from './userVisibilityType'
export {
  API, LINKS, CONNECTION_STATE_TYPE, HOUSEHOLD_ROLE_TYPE, INPUT_TYPE,
}

const messageKeys = Object.values(MESSAGES).flatMap(group => Object.values(group))
export type AVAILABLE_MESSAGES = typeof messageKeys[number]
