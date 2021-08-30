import React, { Fragment } from 'react'

import { MessageLink } from 'clientSrc/styles/blocks/home'
import { API, LINKS, SETTING_CATEGORIES, HOUSEHOLD_TABS, CONNECTION_TABS } from 'shared/constants'

const linksToUrls = {
  [LINKS.FIND_CONNECTION]: `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.CONNECTIONS}?tab=${CONNECTION_TABS.FIND_CONNECTION}`,
  [LINKS.NEW_HOUSEHOLD]: `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=${HOUSEHOLD_TABS.NEW_HOUSEHOLD}`,
}

export const linkify = (text, history) => {
  const linkMatches = text?.match(/@\[[a-zA-Z0-9_-]*][^@]*@/g)
  if (!linkMatches) {
    return text
  }

  let newText = text
  const potentialLinks = linkMatches
    .map(potentialLink => {
      const parts = potentialLink.split(']')
      if (parts.length > 1) {
        const linkKey = parts.splice(0, 1)[0].substring(2)
        const linkText = parts.join(']').slice(0, -1)

        newText = newText.replace(potentialLink, '@[]@')
        return {
          link: linksToUrls[linkKey],
          text: linkText,
        }
      }
      return null
    })
    .filter(Boolean)

  return (
    <>
      {newText.split('@[]@').map((textPart, index) => (
        <Fragment key={`textpart-${index}`}>
          {textPart}
          {potentialLinks[index] && (
            <MessageLink onClick={() => history.push(potentialLinks[index].link)}>
              {potentialLinks[index].text}
            </MessageLink>
          )}
        </Fragment>
      ))}
    </>
  )
}
