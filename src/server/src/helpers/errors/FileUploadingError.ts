import ErrorWithLogging from './ErrorWithLogging'
import { ErrorLogger } from '../logger'

export default class FileUploadingError extends ErrorWithLogging {
  constructor(message: string) {
    super(message)
    this.name = 'FileUploadingError'
    ErrorLogger(`${this.stack}\n`)
  }
}
