export default class ErrorWithLogging extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ErrorWithLogging'
  }
}
