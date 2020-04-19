import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const logFile = 'db_log.txt';

export default async (sql:string):Promise<void> => {
  fs.appendFile(
    path.join(__dirname, '..', '..', process.env.LOGS_PATH || 'logs', logFile), 
    formatLog(sql), 
    (err) => {
      console.error(err);
    }
  );
}

const formatLog = (sql:string):string => {
  const date = new Date();
  return `[${date.toLocaleString()}] ${sql};\n`;
}
