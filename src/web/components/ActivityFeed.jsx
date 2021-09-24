import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getTimeString } from '../../helpers/connections'
import { LocaleText } from '../common'
import {
  ActivityFeedBox,
  FeedMessageBox,
  FeedMessageContent,
  FeedMessagePictureMain,
  FeedMessagePictureSecondary,
  FeedMessageTime,
} from '../../styles/blocks/feed'

export const ActivityFeed = () => {
  const activityFeed = useSelector(({ app: { activityFeed } }) => activityFeed)
  const history = useHistory()

  return (
    <ActivityFeedBox>
      {activityFeed.map(({ message, messageTexts, messagePhotos, link, dateCreated }, index) => {
        const [mainPhoto, secPhoto] = messagePhotos
        const formattedTime = getTimeString(dateCreated)

        return (
          <FeedMessageBox key={`feed-${index}`} onClick={() => history.push(link)} hasLink={Boolean(link)}>
            {mainPhoto && <FeedMessagePictureMain><img alt="activity main" src={mainPhoto} /></FeedMessagePictureMain>}
            {secPhoto && <FeedMessagePictureSecondary><img alt="activity secondary" src={secPhoto} /></FeedMessagePictureSecondary>}
            <FeedMessageContent>
              <LocaleText message={message} messageTexts={messageTexts} highlightInterpolated />
            </FeedMessageContent>
            <FeedMessageTime>{formattedTime}</FeedMessageTime>
          </FeedMessageBox>
        )
      })}
    </ActivityFeedBox>
  )
}
