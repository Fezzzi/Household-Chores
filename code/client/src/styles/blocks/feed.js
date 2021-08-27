import styled from 'styled-components'

import { COLORS } from 'clientSrc/constants'

export const ActivityFeedBox = styled.div`
  position: absolute;
  right: 25px;
  display: flex;
  flex-flow: column;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 1px;
`

export const FeedMessageBox = styled.div`
  position: relative;
  width: 340px;
  height: 95px;
  background: ${COLORS.THEME_FRONT};
  
  :hover{
    cursor: ${props => props.hasLink ? 'pointer' : 'default'};
    background-color: ${COLORS.THEME_BACK};
  }
`

export const FeedMessageContent = styled.div`
  position: absolute;
  left: 90px;
  top: 10px;
  right: 10px;
  font-size: 16.8px;
  line-height: 19px;
`

const FeedImage = styled.div`
  position: absolute;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`

export const FeedMessagePictureMain = styled(FeedImage)`
  width: 60px;
  height: 60px;
  left: 10px;
  top: 12.5px
`

export const FeedMessagePictureSecondary = styled(FeedImage)`
  width: 30px;
  height: 30px;
  bottom: 15px;
  left: 45px;
`

export const FeedMessageTime = styled.div`
  position: absolute;
  left: 90px;
  bottom: 10px;
  font-weight: 600;
  font-size: 0.8rem;
`
