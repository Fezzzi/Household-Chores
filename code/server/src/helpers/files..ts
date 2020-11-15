import crypto from 'crypto';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const PROFILE_DIR = 'profile';
export const HOUSEHOLD_DIR = 'household';
const UPLOAD_DIR = process.env.UPLOAD_PATH || 'uploads';

export const uploadFiles = (
  files: { data: string; type: string; name: string; size: number }[],
  directory: string,
  userFsKey: string
): Array<string | null> => {
  const uploadedFiles: Array<string | null> = [];

  files.forEach(fileObject => {
    const fileHash = fileObject.data.split(';base64,').pop();

    const filePath = path.join(path.resolve('./'), UPLOAD_DIR, userFsKey, directory);
    mkdirSync(filePath, { recursive: true });

    const fileExtension = fileObject.type.substring(fileObject.type.indexOf('/') + 1);
    let fileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`;
    let attempts = 5;
    while (existsSync(path.join(filePath, fileName)) && attempts > 0) {
      fileName = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`;
      --attempts;
    }

    if (attempts === 0) {
      uploadedFiles.push(null);
    } else {
      writeFileSync(path.join(filePath, fileName), fileHash, { encoding: 'base64' });
      uploadedFiles.push(`/${UPLOAD_DIR}/${userFsKey}/${directory}/${fileName}`);
    }
  });
  return uploadedFiles;
};
