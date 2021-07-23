export interface ResetPassDataShape {
  resetLink: string
}

export const getSubject = () => 'Request to reset your password at Household Application'

export const getText = (data: ResetPassDataShape) => `
  We received a request to reset your HouseHold account password.
  
  To reset your password, click the link below. If you did not make the request, please ignore this email.
  
  ${data.resetLink}
`

export const getHTML = (data: ResetPassDataShape) => `
  <div>
    <p>We received a request to reset your HouseHold account password.</p>
    <p>To reset your password, follow the link below. If you did not make the request, please ignore this email.</p>
    <p>${data.resetLink}</p>
  </div>
`
