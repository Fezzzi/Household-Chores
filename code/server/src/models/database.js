import { connection } from './connection';
import dbLogger from './dbLogger';

const query = connection.query;
const database = connection;

database.query = (sql, values, cb) => {
  dbLogger(sql);
  query(sql, values, cb);
};

export default database;
