import styled from 'styled-components'

import { COLORS } from 'clientSrc/constants'

export const AuthContent = styled.div`
  color: ${COLORS.FONT};
  justify-content: flex-start;
  margin: 12px auto 0 auto;
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 44px;
}
`

export const LogoBlock = styled.div`
  margin: 10px 0 0;
  padding: 10px 0 0;
  font-size: 72px;
  font-weight: 800;
  text-align: center;
  width: 100%;
  line-height: normal;
  font-family: Carter One;
`

export const LogoTopBlock = styled.div`
  height: 80px;
  width: 100%;
  position: relative;
  top: 3px;
  
  & svg {
    height: 100%;
    width: 100%;
    
    & #logo-body ellipse,
    & #logo-body line,
    & #logo-body path,
    & #logo-body rect {
      stroke: ${COLORS.FONT};
    }
    
    & #logo-roof line,
    & #logo-roof path,
    & #logo-roof rect {
      stroke: ${props => props.stroke ?? '#EB4132'};
    }
  }
  
  & line {
    stroke: ${props => props.stroke};
  }
`

export const InputsBlock = styled.div`
  background-color: ${COLORS.THEME_FRONT};
  border: 1px solid ${COLORS.BORDER};
  border-radius: 1px;
  margin: 10px 0;
  padding: ${props => props.extraPadding ? 25 : 10}px 0;
`

export const LinkRow = styled.a`
  color: ${COLORS.BLUE_SECONDARY};
  font-size: 12px;
  line-height: 14px;
  margin-top: 12px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  display: block;

  &:active {
    opacity: .7;
  }
`

export const BottomMessageWrapper = styled.div`
  display: block;
  color: ${COLORS.GREY_PRIMARY};
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  margin: -3px 0 -4px;
`

export const BottomMessageBlock = styled.p`
  color: ${COLORS.FONT};
  font-size: 14px;
  margin: 15px;
  text-align: center;
`

export const BottomMessageLink = styled.a`
  color: ${COLORS.BLUE_PRIMARY};
  text-decoration: none;
  cursor: pointer;

  &:active {
    opacity: .7;
  }
`

export const MessageBlock = styled.p`
  color: ${COLORS.GREY_PRIMARY};
  font-size: ${props => props.bigFont ? 14 : 12}px;
  margin: ${props => props.margin ?? '10px 40px'};
  line-height: ${props => props.bigFont ? 18 : 16}px;
  text-align: center;
`

export const MessageBlockLink = styled.span`
  color: ${COLORS.GREY_PRIMARY};
  font-weight: 600;
  text-decoration: none;
  
  :hover {
    cursor: pointer;
  }
`