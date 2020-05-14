export const formatDate = (date, delim = '.') =>
  date.getDay() + delim + date.getMonth() + delim + date.getFullYear();

export const formatTime = (date, delim = ':') =>
  date.getHours() + delim + date.getMinutes() + delim + date.getSeconds();

export const formatDateTime = (date, dateDelim = '.', timeDelim = ':') =>
  `${formatDate(date, dateDelim)} ${formatTime(date, timeDelim)}`;
