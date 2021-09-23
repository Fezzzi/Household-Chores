export const interpolate = (applicationTexts, messageId, messageTexts = [], highlight = false) => {
  if (messageTexts.length) {
    return applicationTexts[messageId].replace(/\$\d+\$/g, match => {
      const index = Number(match.replace(/\$/g, ''))

      return highlight
        ? `<b>${messageTexts[Math.min(Math.max(index - 1, 0), messageTexts.length - 1)]}</b>`
        : messageTexts[Math.min(Math.max(index - 1, 0), messageTexts.length - 1)]
    })
  }

  return applicationTexts[messageId]
}
