import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

export const handleAction = async (
  inputs: any,
  validationFunc: (data: object) => Promise<boolean|number>,
  handlerFunc: (data: any, req: any, res: any) => Promise<any>,
  req: any,
  res: any
): Promise<boolean> => {
  const valid = await validationFunc(inputs)
  if (valid === false || valid === null) {
    res.status(200).send({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA],
    })
  } else if (valid === -1) {
    res.status(200).send({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.NO_ACCOUNT],
    })
  } else {
    const response = await handlerFunc(inputs, req, res)
    res.status(200).send(response)
  }
  return true
}

// This way we either log in new user or log out logged user.
// FE shouldn't let logged user access the /login url until explicit logout action, thus the condition should never be met
export const setSession = (req: any, res: any, userId: number, fsKey: string) => {
  if (req.session.user && req.session.user !== userId && req.cookies.user_sid) {
    res.clearCookie('user_sid')
    return
  }
  req.session.user = userId
  req.session.fsKey = fsKey
}
