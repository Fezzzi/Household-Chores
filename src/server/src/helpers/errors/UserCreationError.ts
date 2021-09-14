import ErrorWithLogging from './ErrorWithLogging'
import { ErrorLogger } from '../logger'

export default class UserCreationError extends ErrorWithLogging {
  constructor (message: string) {
    super(message)
    this.name = 'UserCreationError'
    ErrorLogger(`${this.stack}\n`)
  }
}
