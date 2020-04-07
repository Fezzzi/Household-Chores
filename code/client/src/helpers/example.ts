export const formatDate = (date: Date, delim = '.'): string =>
  date.getDay() + delim + date.getMonth() + delim + date.getFullYear();

export const formatTime = (date: Date, delim = ':'): string =>
  date.getHours() + delim + date.getMinutes() + delim + date.getSeconds();

export const formatDateTime = (date: Date, dateDelim = '.', timeDelim = ':'): string =>
  `${formatDate(date, dateDelim)} ${formatTime(date, timeDelim)}`;
