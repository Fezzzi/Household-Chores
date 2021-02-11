import { tActivityCols } from 'serverSrc/database/models/tables'
import { ACTIVITY_KEYS } from 'shared/constants/mappingKeys'

const reverseMapping = (mapping: object) =>
  Object.fromEntries(Object.entries(mapping).map(([name, value]) => [value, name]))

const activityKeyMapping = {
  [ACTIVITY_KEYS.ID]: tActivityCols.id,
  [ACTIVITY_KEYS.MESSAGE]: tActivityCols.message,
  [ACTIVITY_KEYS.LINK]: tActivityCols.link,
  [ACTIVITY_KEYS.DATE_CREATED]: tActivityCols.date_created,
}
const activityDbMapping = reverseMapping(activityKeyMapping)

export const mapToActivityKey = (key: string): string => activityDbMapping[key]
export const mapFromActivityKey = (key: string): string => activityKeyMapping[key]

export const mapData = (data: Record<string, any>, mappingFunc: (key: string) => string): Record<string, any> =>
  Object.fromEntries(
    Object.entries(data)
      .map(([key, value]) => [mappingFunc(key), value])
      .filter(([name]) => Boolean(name))
  )

const toCamelCase = (key: string): string =>
  key.split('_').map(part => part.charAt(0).toUpperCase() + part.substring(1)).join('')

export const apify = (data: Record<string, any>): Record<string, any> =>
  Object.fromEntries(
    Object.entries(data)
      .map(([key, value]) => [toCamelCase(key), value])
  )
