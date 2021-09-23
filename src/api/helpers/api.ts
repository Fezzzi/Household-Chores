type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

type FirstCapitalLetter<S extends string> = S extends `${infer T}${infer U}`
  ? (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends Capitalize<T> ? 1 : 2)
    ? T
    : FirstCapitalLetter<U>
  : never

type CamelToSnakeCase<S extends string, D extends string = FirstCapitalLetter<S>> =
  S extends `${infer T}${D}${infer R}`
    ? `${T}_${Lowercase<D>}${CamelToSnakeCase<R>}`
    : S

export type SnakeCaseObjectToCamelCase<T extends Record<string, any>> =
  { [k in Extract<keyof T, string> as SnakeToCamelCase<k>]: T[k] }

export type CamelCaseObjectToSnakeCase<T extends Record<string, any>> =
  { [k in Extract<keyof T, string> as CamelToSnakeCase<k>]: T[k] }

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
 * Helper function that de-maps fields matching the specified API from openAPI docs to db field names by converting
 * all camelCase fields to snake_case.
 */
export const deApifyObject = <T extends Record<string, any>>(queriedDataObject: T) =>
  Object.fromEntries(
    Object.entries(queriedDataObject).map(([key, value]) => [deApifyKey(key), value])
  ) as CamelCaseObjectToSnakeCase<T>

/**
 * Converts a single key from camelCase to snake_case.
 *
 * @param {string} key
 */
export const deApifyKey = (key: string): CamelToSnakeCase<typeof key> => key
  .split(/(?=[A-Z])/)
  .map(keyPart => keyPart.toLowerCase())
  .join('_')
