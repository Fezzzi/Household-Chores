import { ERROR } from 'shared/constants/localeMessages';

export const handleAction = async (
  data: object,
  validationFunc: (data: object) => Promise<boolean|number>,
  handlerFunc: (data: any) => any,
  res: any
): Promise<boolean> => {
  const valid = await validationFunc(data);
  if (valid === false || valid === null) {
    res.status(200).send({ errors: [ERROR.INVALID_DATA] });
  } else if (valid === -1) {
    res.status(200).send({ errors: [ERROR.NO_ACCOUNT] });
  } else {
    const response = await handlerFunc(data);
    res.status(200).send(response);
  }
  return true;
};

// This way we either log in new user or log out logged user.
// FE shouldn't let logged user access the /login url until explicit logout action, thus the condition should never be met
export const setUserCookie = (req: any, res: any, userId: number) =>
  req.session.user && req.session.user !== userId && req.cookies.user_sid
    ? res.clearCookie('user_sid')
    : req.session.user = userId;
