import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

import { LOGS } from 'serverSrc/constants'
import { formatDate } from 'shared/helpers/date'

dotenv.config()

const LOGS_PATH = path.join(path.resolve('./code/server'), process.env.LOGS_PATH ?? 'logs')

const formatMessage = (message: string): string => `[${formatDate()}] ${message}`

export const ErrorLogger = async (message: string): Promise<void> => {
  const msg = formatMessage(message)
  fs.appendFile(
    path.join(LOGS_PATH, LOGS.ERROR_LOG),
    msg.endsWith('\n') ? msg : `${msg}\n`,
    // eslint-disable-next-line no-console
    err => err && console.error(err))
}

export const Logger = async (file: string, message: string): Promise<void> => {
  const msg = formatMessage(message)
  fs.appendFile(
    path.join(LOGS_PATH, file),
    msg.endsWith('\n') ? msg : `${msg}\n`,
    err => err && ErrorLogger(`ErrorLogger: ${err.message}`))
}
