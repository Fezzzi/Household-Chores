import ErrorWithLogging from './ErrorWithLogging';
import { ErrorLogger } from '../logger';

export default class TestError extends ErrorWithLogging {
  constructor(message: string) {
    super(message);
    this.name = 'MigrationError';
    ErrorLogger(`${this.stack}\n`);
  }
}
