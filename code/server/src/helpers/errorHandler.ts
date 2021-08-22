import { NextFunction, Response } from 'express'

import { ERROR } from 'shared/constants/localeMessages'
import { NOTIFICATION_TYPE } from 'shared/constants'
import { ErrorLogger } from 'serverSrc/helpers/logger'
import ErrorWithLogging from 'serverSrc/helpers/errors/ErrorWithLogging'

/**
 * Handler to catch `async` operation errors and pass them to the next middleware in the pipeline.
 */
export const catchErrors = (
  action: (reg: any, res: Response, next: NextFunction) => Promise<void | boolean>
) => (req: any, res: Response, next: NextFunction) => action(req, res, next).catch(err => apiErrorHandler(err, req, res))

/**
 * Error handling middleware
 */
export const apiErrorHandler = (err: any, _req: any, res: Response) => {
  console.error(`[ERROR]: ${err.stack}`)

  if (!(err instanceof ErrorWithLogging)) {
    ErrorLogger(`${err.stack}`)
    res.status(500).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
    return
  }

  res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
}
