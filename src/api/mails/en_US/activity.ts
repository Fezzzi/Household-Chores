import { API, PROFILE_TABS, SETTING_CATEGORIES } from 'shared/constants'
import { BACKLINK_URL } from 'api/constants/config'

import { ActivityDataShape } from '../dataShapes'

export const getSubject = () => 'New activity at Household Application'

export const getText = (data: ActivityDataShape) => `
  ${data.message}.
  
  ${data.link
    ? `You can follow this link to find out more (${data.link})!`
    : ''}

  You can manage your notification settings here (${BACKLINK_URL}/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.PROFILE}?tab=${PROFILE_TABS.NOTIFICATIONS}).
`

export const getHTML = (data: ActivityDataShape) => `
  <div>
    <div style="margin: auto; max-width: 380px; height: 95px; position: relative;">
      <div style="width: 60px; height: 60px; left: 10px; top: 12.5px; position: absolute;">
        <img style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" alt="activity main" src="${BACKLINK_URL}/${data.photos[0]}">
      </div>
      ${data.photos[1]
        ? `
          <div style="width: 30px; height: 30px; bottom: 15px; left: 45px; position: absolute;">
            <img style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" alt="activity secondary" src="${BACKLINK_URL}/${data.photos[1]}">
          </div>
        ` : ''}
      <div style="position: absolute; left: 90px; top: 10px; right: 10px; font-size: 16.8px; line-height: 19px;">
        <span>${data.message}</span>
      </div>
      ${data.link
        ? `
          <div style="position: absolute; left: 90px; bottom: 10px; font-weight: 600; font-size: 0.8rem;">
            <span>You can <a href="${BACKLINK_URL}/${data.link}">follow this link to find out more</a>!</span>
          </div>`
        : ''}
    </div>
    <p style="color: #898989; font-size: 13px; text-align: center;">
      You can manage your notification settings here 
      <a href="${BACKLINK_URL}/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.PROFILE}?tab=${PROFILE_TABS.NOTIFICATIONS}">here</a>.
    </p>
  </div>
`
