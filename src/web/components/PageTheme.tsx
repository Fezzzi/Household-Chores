import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { COLORS } from 'web/constants'
import { useSelector } from 'web/helpers/useTypedRedux'

interface PageThemeProps {
  children: ReactNode
}

export const PageTheme = ({ children }: PageThemeProps) => {
  const { theme, changing } = useSelector(({ theme }) => theme)

  return (
    <ThemeWrapper className={`${theme} ${changing ? 'theme-transition' : ''}`}>
      {children}
    </ThemeWrapper>
  )
}

const ThemeWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  scrollbar-color: ${COLORS.GREY_PRIMARY} transparent;
  scrollbar-width: thin;

  > * div {
    scrollbar-width: thin;
  }

  > * img {
    user-select: none;
    object-fit: cover;
  }

  > * ::-webkit-scrollbar, ::-webkit-scrollbar {
    appearance: none;
    width: 4px;
    height: 4px;
  }

  > * ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb {
    appearance: none;
    background-color: ${COLORS.GREY_PRIMARY};
    border-radius: 5px;
  }

  > * input:-webkit-autofill {
    background-color: inherit;
  }
`
