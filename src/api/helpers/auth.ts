import { Response } from 'express'

// This way we either log in new user or log out logged user.
// FE shouldn't let logged user access the /login url until explicit logout action, thus the condition should never be met
export const setSession = (
  req: any,
  res: Response,
  userId: number,
  userNickname: string,
  fsKey: string,
  locale: string,
) => {
  if (req.session.userId && req.session.userId !== userId && req.cookies.user_sid) {
    res.clearCookie('user_sid')
    return
  }

  req.session.userId = userId
  req.session.userNickname = userNickname
  req.session.fsKey = fsKey
  req.session.locale = locale
}
