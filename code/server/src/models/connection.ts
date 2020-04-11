import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const config: object = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const connection = mysql.createConnection(config);

export const pool = mysql.createPool(config);
