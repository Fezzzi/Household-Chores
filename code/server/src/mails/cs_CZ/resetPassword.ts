export interface ResetPassDataShape {
  resetLink: string
}

export const getSubject = () => 'Žádost o obnovu vašeho hesla v Household Application'

export const getText = (data: ResetPassDataShape) => `
  Obdrželi jsme žádost o obnovu hesla k vašemu HouseHold účtu.
  
  Pro obnovu hesla následujte odkaz níže. Pokud jste o obnovu nežádali, ignorujte tento email.
  
  ${data.resetLink}
`

export const getHTML = (data: ResetPassDataShape) => `
  <div>
    <p>Obdrželi jsme žádost o obnovu hesla k vašemu HouseHold účtu.</p>
    <p>Pro obnovu hesla následujte odkaz níže. Pokud jste o obnovu nežádali, ignorujte tento email.</p>
    <p>${data.resetLink}</p>
  </div>
`
