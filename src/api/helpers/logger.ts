import { appendFile, existsSync, mkdirSync } from 'fs'
import { sep as dirSeparator, join } from 'path'

import { CONFIG, LOGS } from 'api/constants'
import { formatDate } from 'shared/helpers/date'

const formatMessage = (message: string): string => `[${formatDate()}] ${message}`

function ensurePathExists (filename: string) {
  const filePathParts = filename.split(dirSeparator)

  if (filePathParts.length > 1) {
    const folderPath = filePathParts.slice(0, filePathParts.length - 1).join(dirSeparator)
    const folderExists = existsSync(folderPath)

    if (!folderExists) {
      mkdirSync(folderPath, { recursive: true })
    }
  }
}

const errorLogFile = join(CONFIG.LOGS_PATH, LOGS.ERROR_LOG)
ensurePathExists(errorLogFile)
export const ErrorLogger = async (message: string): Promise<void> => {
  const msg = formatMessage(message)
  appendFile(errorLogFile, msg.endsWith('\n') ? msg : `${msg}\n`, console.error)
}

export const Logger = async (file: string, message: string): Promise<void> => {
  const logFile = join(CONFIG.LOGS_PATH, file)
  const msg = formatMessage(message)
  ensurePathExists(logFile)
  appendFile(
    logFile,
    msg.endsWith('\n') ? msg : `${msg}\n`,
    err => err && ErrorLogger(`ErrorLogger: ${err.message}`))
}
