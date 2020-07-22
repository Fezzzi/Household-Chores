import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const encryptPass = async (pass: string): Promise<string> => bcrypt.hash(pass, 13);

export const checkPass = (pass: string, encrypted: string): Promise<boolean> => bcrypt.compare(pass, encrypted);

export const generatePass = (): string => crypto.randomBytes(10).toString('hex');
