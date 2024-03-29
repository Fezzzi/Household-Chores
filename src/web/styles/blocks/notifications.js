import styled from 'styled-components'

import { COLORS } from '../../constants'
import { clickableStyle } from './common'

export const NotificationsBlock = styled.div`
  position: fixed;
  top: 50px;
  right: 50px;
  z-index: 100;
  overflow-y: hidden;
  list-style: none;
  margin: 0px auto;
`

export const NotificationWrapper = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 300px;
  min-height: 60px;
  margin-bottom: 14px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 0px;
  color: ${COLORS.FONT};
  z-index: 100;
  background: ${COLORS.THEME_FRONT};
  border-radius: 2px;
  transition: all 0.5s ease 0s;
  overflow: hidden;
  padding: 10px;
`

export const NotificationIconBlock = styled.div`
  position: relative;
  display: block;
  width: 60px;
`

export const NotificationIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  margin: auto;
  display: flex;
  border-radius: 10px;
  box-sizing: border-box;

  & svg {
    width: 100%;
    height: 100%;
    fill: ${props => props.iconColor};
  }
`

export const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  padding-right: 10px;
  margin: 0px;
`

export const NotificationMessage = styled.p`
  margin: 0px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
`

export const NotificationClose = styled.div`
  opacity: 0.6;
  position: relative;
  display: flex;
  width: 20px;
  height: 20px;
  font-size: 14px;
  fill: ${COLORS.BORDER};
  transition: opacity 0.1s ease 0s;

  ${clickableStyle}
  &:hover {
    fill: ${COLORS.BORDER_ACTIVE};
  }
  
  & svg {
    width: 100%;
    height: 100%;
    stroke: ${COLORS.FONT};
    stroke-width: 0.4;
  }
`
