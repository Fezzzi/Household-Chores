import { expect } from 'chai';

import { formatTime, formatDateTime, formatDate } from 'clientSrc/helpers/example';

describe('Helpers > example', () => {
  describe('date formatters', () => {
    it('should correctly format date', () => {
      const date = new Date();
      const formattedDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

      expect(formatDate(date, '.')).to.eql(formattedDate);
    });

    it('should correctly format time', () => {
      const date = new Date();
      const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      expect(formatTime(date, ':')).to.eql(formattedTime);
    });

    it('should correctly format date time', () => {
      const date = new Date();
      const formattedDateTime = `${date.getDay()}\\${date.getMonth()}\\${date.getFullYear()}`
              + ` ${date.getHours()},${date.getMinutes()},${date.getSeconds()}`;

      expect(formatDateTime(date, '\\', ',')).to.eql(formattedDateTime);
    });
  });
});
