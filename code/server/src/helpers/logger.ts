import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const logsPath = path.join(__dirname, '..', '..', process.env.LOGS_PATH || 'logs');

export default async (file: string, log: string, suffix = ''): Promise<void> => {
  fs.appendFile(
    path.join(logsPath, file),
    formatLog(log, suffix), err => err && console.error(err));
}

const formatLog = (sql: string, suffix: string): string => {
  const date = new Date();
  return `[${date.toLocaleString()}] ${sql}${suffix}`;
};
