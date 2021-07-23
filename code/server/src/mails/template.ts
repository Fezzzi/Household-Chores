import { BACKLINK_URL } from 'serverSrc/constants/config'

export const wrapSubject = (subject: string) => subject

export const wrapText = (text: string) => `
  HouseHold (${BACKLINK_URL})
  
${text}
  
  © 2021 Filip Horký
`

export const wrapHTML = (html: string) => `
  <div style="color: #262626; font-family: Carter One, Arial, serif; font-size: 18px;">
    <div style="width: 100%; text-align: center; padding: 15px 0 35px;">
      <a style="color: inherit; text-decoration: none;" href="${BACKLINK_URL}">
        <img style="width: 80px; height: 80px;" src="${BACKLINK_URL}/static/icon-150.png" alt="header image" />
        <h1 style="padding: 0; margin: 0; font-size: 72px; font-weight: 800;">HouseHold</h1>
      </a>
    </div>

    <div style="padding: 0 15px;">
      ${html}
    </div>

    <div style="width: 100%; text-align: center; color: #898989; font-size: 13px; font-weight: 600; text-transform: uppercase; padding-top: 50px;">
      © 2021 Filip Horký
    </div>
  </div>
`
