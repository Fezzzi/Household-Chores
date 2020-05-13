import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import * as LOGS from 'serverSrc/constants/logs';

dotenv.config();

const LOGS_PATH = path.join(__dirname, '..', '..', process.env.LOGS_PATH || 'logs');

const formatMessage = (message: string): string => {
  const date = new Date();
  return `[${date.toLocaleString()}.${date.getMilliseconds()}] ${message}`;
};

export const ErrorLogger = async (message: string): Promise<void> =>
  fs.appendFile(
    path.join(LOGS_PATH, LOGS.ERROR_LOG),
    formatMessage(message),
    // eslint-disable-next-line no-console
    err => err && console.error(err));

export const Logger = async (file: string, message: string): Promise<void> =>
  fs.appendFile(
    path.join(LOGS_PATH, file),
    formatMessage(message),
    err => err && ErrorLogger(`ErrorLogger: ${err.message}\n`));