import bcrypt from 'bcrypt';

export const encryptPass = async (pass: string): Promise<string> => bcrypt.hash(pass, 10);

export const checkPass = (pass: string, encrypted: string): Promise<boolean> => bcrypt.compare(pass, encrypted);
