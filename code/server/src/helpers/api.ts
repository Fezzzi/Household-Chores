/**
 * Helper function that maps db query output fields to match the specified API from openAPI docs.
 * Converts from snake_case to camelCase and flips fields to '<entity>Id' template.
 */
export const apify = async <T>(queryResult: Promise<Array<Record<string, T>>>): Promise<Array<Record<string, T>>> => {
  const queriedData = await queryResult

  return queriedData.map(data => Object.fromEntries(
    Object.entries(data).map(([key, value]) => [mapKey(key), value])
  ))
}

/**
 * Converts single key from snake_case to camelCase and flips fields to '<entity>Id' template.
 * @param key
 */
export const mapKey = (key: string): string => {
  const keyParts = key.split('_')
  if (keyParts[0] === 'id') {
    keyParts.push(keyParts.splice(0, 1)[0])
  }

  return [keyParts[0], ...keyParts.splice(1).map(keyPart => keyPart[0].toUpperCase() + keyPart.slice(1))].join('')
}

/**
 * Helper function that de-maps fields matching the specified API from openAPI docs to db field names.
 * Converts from camelCase to snake_case and flips fields from '<entity>Id' template to 'id_<entity>'.
 */
export const deApify = <T>(data: Record<string, T>): Record<string, T> => Object.fromEntries(
  Object.entries(data).map(([key, value]) => [deMapKey(key), value])
)

/**
 * Converts single key from camelCase to snake_case and flips fields from '<entity>Id' template to 'id_<entity>'.
 * @param key
 */
export const deMapKey = (key: string): string => {
  const keyParts = key.split(/(?=[A-Z])/)
  if (keyParts[keyParts.length - 1] === 'Id') {
    keyParts.unshift(keyParts.pop()!)
  }

  return keyParts.map(keyPart => keyPart.toLowerCase()).join('_')
}
