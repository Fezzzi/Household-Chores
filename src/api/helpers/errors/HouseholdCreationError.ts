import ErrorWithLogging from './ErrorWithLogging'
import { ErrorLogger } from '../logger'

export default class HouseholdCreationError extends ErrorWithLogging {
  constructor (message: string) {
    super(message)
    this.name = 'HouseholdCreationError'
    ErrorLogger(`${this.stack}\n`)
  }
}
