import React, { Fragment } from 'react'

import { API, LINKS, SETTING_CATEGORIES, HOUSEHOLD_TABS, CONNECTION_TABS } from 'shared/constants'
import { Link } from 'web/components/common'
import { MessageLink } from 'web/styles/blocks/home'

const linksToUrls = {
  [LINKS.FIND_CONNECTION]: `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.CONNECTIONS}?tab=${CONNECTION_TABS.FIND_CONNECTION}`,
  [LINKS.NEW_HOUSEHOLD]: `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=${HOUSEHOLD_TABS.NEW_HOUSEHOLD}`,
}

const convertBoldToReact = (text: string) => {
  const boldMatches = text
    .match(/<b>((?!<\/b>).)*/g)
    ?.map(match => match.replace('<b>', '')) ?? []

  if (boldMatches.length === 0) {
    return text
  }

  const splitRegex = new RegExp(boldMatches.map(match => `<b>${match}</b>`).join('|'))
  const textParts = text.split(splitRegex)

  return (
    <>
      {textParts[0]}
      {boldMatches.map((boldText, index) => (
        <Fragment key={`bold-text-${index}`}>
          <b>{boldText}</b>
          {textParts[index + 1] ?? ''}
        </Fragment>
      ))}
    </>
  )
}

interface PotentialLink {
  link: string
  text: string
}
const findPotentialLinks = (text: string): [string, PotentialLink[]] => {
  const linkMatches = text.match(/@\[[a-zA-Z0-9_-]*][^@]*@/g) ?? []
  let newText = text

  const potentialLinks = linkMatches.map(potentialLink => {
    const parts = potentialLink.split(']')
    if (parts.length > 1) {
      const linkKey = parts.splice(0, 1)[0].substring(2) as keyof typeof linksToUrls
      const linkText = parts.join(']').slice(0, -1)

      newText = newText.replace(potentialLink, '@[]@')
      return {
        link: linksToUrls[linkKey],
        text: linkText,
      }
    }
    return null
  }).filter(Boolean)

  return [newText, potentialLinks as PotentialLink[]]
}

/**
 * Interpolates '@[...]...@' expressions in localized strings for actual React links.
 * Converts all plaintext highlighting '<b>...</b>' in localized messages to actual HTML.
 */
export const transformToReact = (text: string | null) => {
  if (text == null) {
    return null
  }

  const [newText, potentialLinks] = findPotentialLinks(text)
  return (
    <>
      {newText.split('@[]@').map((textPart, index) => (
        <Fragment key={`textpart-${index}`}>
          {convertBoldToReact(textPart)}
          {potentialLinks[index] != null && (
            <Link route={potentialLinks[index]!.link}>
              <MessageLink>
                {convertBoldToReact(potentialLinks[index]!.text)}
              </MessageLink>
            </Link>
          )}
        </Fragment>
      ))}
    </>
  )
}
