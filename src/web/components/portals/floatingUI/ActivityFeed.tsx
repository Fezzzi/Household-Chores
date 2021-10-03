import React from 'react'
import styled from 'styled-components'

import { COLORS } from 'web/constants'
import { useSelector } from 'web/helpers/useTypedRedux'

import { LocaleText, Link, FormattedTime } from '../../common'

export const ActivityFeed = () => {
  const activityFeed = useSelector(({ app: { activityFeed } }) => activityFeed)

  return (
    <>
      {activityFeed.map(({
        message,
        messageTexts,
        messagePhotos,
        link,
        dateCreated,
        dateSeen,
      }, index) => {
        const [mainPhoto, secPhoto] = messagePhotos
        const absoluteLink = link ? `/${link}` : link

        return (
          <Link route={absoluteLink} key={`feed-${index}`}>
            <FeedMessageBox hasLink={absoluteLink !== null}>
              {mainPhoto && <FeedMessagePictureMain><img alt="activity main" src={mainPhoto}/></FeedMessagePictureMain>}
              {secPhoto && (
                <FeedMessagePictureSecondary>
                  <img alt="activity secondary" src={secPhoto}/>
                </FeedMessagePictureSecondary>
              )}
              <FeedMessageContent>
                <LocaleText message={message} messageTexts={messageTexts} highlightInterpolated/>
              </FeedMessageContent>
              <FeedMessageTime>
                <FormattedTime time={dateCreated} />
              </FeedMessageTime>
              {dateSeen === null ? <FeedMessageUnread /> : ''}
            </FeedMessageBox>
          </Link>
        )
      })}
    </>
  )
}

const FeedMessageBox = styled.div<{ hasLink: boolean }>`
  position: relative;
  width: 340px;
  height: 95px;
  background: ${COLORS.THEME_FRONT};
  
  :hover{
    cursor: ${props => props.hasLink ? 'pointer' : 'default'};
    background-color: ${COLORS.THEME_BACK};
  }
`

const FeedMessageContent = styled.div`
  position: absolute;
  left: 90px;
  top: 10px;
  right: 14px;
  font-size: 14px;
  line-height: 18px;
`

const FeedImage = styled.div`
  position: absolute;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`

const FeedMessagePictureMain = styled(FeedImage)`
  width: 60px;
  height: 60px;
  left: 14px;
  top: 12.5px
`

const FeedMessagePictureSecondary = styled(FeedImage)`
  width: 30px;
  height: 30px;
  bottom: 15px;
  left: 49px;
`

const FeedMessageTime = styled.div`
  position: absolute;
  left: 90px;
  bottom: 10px;
  font-weight: 600;
  font-size: 0.8rem;
`

const FeedMessageUnread = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: ${COLORS.RED_SECONDARY};
`
