import styled from 'styled-components'

export const ResourceWrapper = styled.div`
  width: 100%;
`

export const BannerWrapper = styled.div`
  width: 100%;
  height: ${props => (props.banner && '200px') || '100px'};
  background: url("${props => props.banner || ''}") no-repeat center;
  background-size: 100%;
`

export const BodyWrapper = styled.div`
  padding: 0 200px;
  position: relative;
  top: -20px;
  line-height: 24px;
`

export const IconBlock = styled.div`
  width: 75px;
  height: ${props => (props.icon && '75px') || '30px'};
  background: url("${props => props.icon || ''}") no-repeat center;
  background-size: 100%;
`

export const HeadlineBlock = styled.h1`
  font-weight: 800px;
  font-size: 26px;
`

export const BodyBlock = styled.div`
  font-size: 18px;
`

export const TopButton = styled.div`
  position: absolute;
  z-index: 25;
  top: 15px;
  left: 15px;
  width: 25px;
  height: 25px;
  opacity: .7;
  
  &:hover {
    cursor: pointer;
    opacity: .9;
  }
  
  &:active {
    opacity: 1;
  }
`
