import { ErrorLogger } from 'serverSrc/helpers/logger'
import ErrorWithLogging from 'serverSrc/helpers/errors/ErrorWithLogging'
import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

export default (err: any, _req: any, res: any) => {
  // We skip logging in case Error is child of ErrorWithLogging because the error handles logging itself
  if (!(err instanceof ErrorWithLogging)) {
    ErrorLogger(`${err.stack}`)
  }

  res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
}
