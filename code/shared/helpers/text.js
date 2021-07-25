export const interpolate = (applicationTexts, message) => {
  const replacementString = message.match(/^.*\$\[(.*)]\$$/)?.[1]
  const cleanedMessage = message.replace(/^(.*)\$\[.*]\$/, '$1')
  let localizedText = applicationTexts[cleanedMessage]

  if (replacementString) {
    const replacements = replacementString.replace(/, /g, ',').split(',')
    localizedText = localizedText.replace(/\$\d+\$/g, match => {
      const index = Number(match.replace(/\$/g, ''))
      return replacements[Math.min(Math.max(index - 1, 0), replacements.length - 1)]
    })
  }

  return localizedText
}
