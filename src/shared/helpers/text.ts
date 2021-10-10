import { AVAILABLE_MESSAGES } from 'shared/constants'
import { LocalizedApplicationTexts } from 'shared/locales'

export const interpolate = (
  applicationTexts: LocalizedApplicationTexts,
  messageId: AVAILABLE_MESSAGES,
  messageTexts: string[] = [],
  highlight = false
) => {
  const localizedText = applicationTexts[messageId]

  if (messageTexts.length && localizedText != null) {
    return localizedText.replace(/\$\d+\$/g, match => {
      const index = Number(match.replace(/\$/g, ''))

      return highlight
        ? `<b>${messageTexts[Math.min(Math.max(index - 1, 0), messageTexts.length - 1)]}</b>`
        : messageTexts[Math.min(Math.max(index - 1, 0), messageTexts.length - 1)]
    })
  }

  return localizedText
}
