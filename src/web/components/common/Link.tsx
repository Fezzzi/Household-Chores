import React, { ReactNode, MouseEvent, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

interface LinkProps {
  route: string
  children: ReactNode
}

export const Link = ({ route, children }: LinkProps) => {
  const history = useHistory()

  const handleLinkClick = useCallback((e: MouseEvent) => {
    e.preventDefault()
    if (e.ctrlKey) {
      window.open(route, '_blank')
    } else {
      history.push(route)
    }
  }, [history, route])

  return (
    <LinkWrapper href={route} onClick={handleLinkClick}>
      {children}
    </LinkWrapper>
  )
}

const LinkWrapper = styled.a`
  color: inherit;
  cursor: inherit;
  text-decoration: inherit;
  outline: inherit;
  outline-offset: inherit;
`
