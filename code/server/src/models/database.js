import { connection } from './connection';

const query = connection.query;
const database = connection;
database.query = (sql, values, cb) => {
  console.log(`Trying to read from db with query ${sql}, value ${values} and cb ${cb}`);
  query(sql, values, cb);
};

export default database;
