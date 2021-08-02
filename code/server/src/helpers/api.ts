type SnakeToCamelCase<S extends string | number | symbol> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

export type SnakeCaseObjectToCamelCase<T extends Record<string, any>> =
  { [k in keyof T as SnakeToCamelCase<k>]: T[k] }

/**
 * Helper function that maps all fields in db query's output to match the specified API from openAPI docs by converting
 * all snake_case fields in the db response to camelCase.
 */
export const apify = async<T extends Record<string, any>> (queryResult: Promise<T[]>) => {
  const queriedData = await queryResult

  return queriedData.map(apifyObject)
}

/**
 * Helper function that maps a single db object's output fields to match the specified API from openAPI docs by converting
 * all snake_case fields in the db response to camelCase.
 */
export const apifyObject = <T extends Record<string, any>>(queriedDataObject: T) =>
  Object.fromEntries(
    Object.entries(queriedDataObject).map(([key, value]) => [apifyKey(key), value])
  ) as SnakeCaseObjectToCamelCase<T>

/**
 * Converts a single key from snake_case to camelCase.
 *
 * @param {string} key
 */
export const apifyKey = (key: string): SnakeToCamelCase<typeof key> => {
  const keyParts = key.split('_')

  return [keyParts[0], ...keyParts.splice(1).map(keyPart => keyPart[0].toUpperCase() + keyPart.slice(1))].join('')
}

/**
 * Helper function that de-maps fields matching the specified API from openAPI docs to db field names by convertin
 * all camelCase fields to snake_case accepted by db.
 */
export const deApify = <T>(data: Record<string, T>): Record<string, T> => Object.fromEntries(
  Object.entries(data).map(([key, value]) => [deApifyKey(key), value])
)

/**
 * Converts a single key from camelCase to snake_case.
 *
 * @param {string} key
 */
export const deApifyKey = (key: string): string => {
  const keyParts = key.split(/(?=[A-Z])/)

  return keyParts.map(keyPart => keyPart.toLowerCase()).join('_')
}
