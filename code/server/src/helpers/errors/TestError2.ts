export default class TestError2 extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TestError2';
  }
}