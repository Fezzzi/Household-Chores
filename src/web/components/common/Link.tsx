import React, { ReactNode, MouseEvent, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

interface LinkProps {
  route: string | null
  children: ReactNode
}

export const Link = ({ route, children }: LinkProps) => {
  const history = useHistory()

  const handleLinkClick = useCallback((e: MouseEvent) => {
    if (route !== null) {
      e.preventDefault()
      if (e.ctrlKey) {
        window.open(route, '_blank')
      } else {
        history.push(route)
      }
    }
  }, [history, route])

  return route
    ? (
      <LinkWrapper href={route} onClick={handleLinkClick}>
        {children}
      </LinkWrapper>
    ) : (
      <>
        {children}
      </>
    )
}

const LinkWrapper = styled.a`
  color: inherit;
  cursor: inherit;
  text-decoration: inherit;
  outline: inherit;
  outline-offset: inherit;
`
