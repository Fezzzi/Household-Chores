import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import * as LOGS from 'serverSrc/constants/logs';

dotenv.config();

const LOGS_PATH = path.join(path.resolve('./code/server'), process.env.LOGS_PATH || 'logs');

const formatMessage = (message: string): string => {
  const date = new Date();
  return `[${padLeft(date.getDate())}.${padLeft(date.getMonth() + 1)}.${date.getFullYear()}, `
    + `${padLeft(date.getHours())}:${padLeft(date.getMinutes())}:${padLeft(date.getSeconds())}.${date.getMilliseconds()}] ${message}`;
};

const padLeft = (datePart: number): string => datePart.toString().length === 1 ? `0${datePart}` : `${datePart}`;

export const ErrorLogger = async (message: string): Promise<void> => {
  const msg = formatMessage(message);
  fs.appendFile(
    path.join(LOGS_PATH, LOGS.ERROR_LOG),
    msg.endsWith('\n') ? msg : `${msg}\n`,
    // eslint-disable-next-line no-console
    err => err && console.error(err));
};

export const Logger = async (file: string, message: string): Promise<void> => {
  const msg = formatMessage(message);
  fs.appendFile(
    path.join(LOGS_PATH, file),
    msg.endsWith('\n') ? msg : `${msg}\n`,
    err => err && ErrorLogger(`ErrorLogger: ${err.message}`));
};
