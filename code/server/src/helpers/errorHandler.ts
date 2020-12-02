import { ErrorLogger } from 'serverSrc/helpers/logger'
import ErrorWithLogging from 'serverSrc/helpers/errors/ErrorWithLogging'

export default (err: any, _req: any, res: any) => {
  // We skip logging in case Error is child of ErrorWithLogging because the error handles logging itself
  if (!(err instanceof ErrorWithLogging)) {
    ErrorLogger(`${err.stack}`)
  }
  res.status(200).send('')
}
