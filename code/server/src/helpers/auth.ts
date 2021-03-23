// This way we either log in new user or log out logged user.
// FE shouldn't let logged user access the /login url until explicit logout action, thus the condition should never be met
export const setSession = (req: any, res: any, userId: number, userNickname: string, fsKey: string) => {
  if (req.session.user && req.session.user !== userId && req.cookies.user_sid) {
    res.clearCookie('user_sid')
    return
  }

  req.session.user = userId
  req.session.userNickname = userNickname
  req.session.fsKey = fsKey
}
