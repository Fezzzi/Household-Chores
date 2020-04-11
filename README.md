# Household-Chores
App for household managing


## Build status
**master** \
[![Build Status](https://dev.azure.com/filiphorkycz/Household-Chores/_apis/build/status/Fezzzi.Household-Chores?branchName=master)](https://dev.azure.com/filiphorkycz/Household-Chores/_build/latest?definitionId=1&branchName=master)

**development** \
[![Build Status](https://dev.azure.com/filiphorkycz/Household-Chores/_apis/build/status/Fezzzi.Household-Chores?branchName=development)](https://dev.azure.com/filiphorkycz/Household-Chores/_build/latest?definitionId=1&branchName=development)


## How to set up and run
1. run `npm install` from the project root
2. install [mysql server](https://dev.mysql.com/downloads/installer/) if needed
    - start the mysql service
    - login as root with `mysql -u root -p` (default password is usually `mysql`)
    - create `household` database with `CREATE DATABASE household;`
    - create `household` user and assign it to the new database with `GRANT ALL PRIVILEGES ON household.* to household@localhost IDENTIFIED BY '[YOUR PASSWORD]';`
3. copy `.env.example` to `.env` and set up DB connection
4. run `npm migrate up` from the project root
5. run `npm run start-back` and `npm run start-front`


## Examples
### Migrations
1. First, run `npm run migrate add migration [migration file name]`
2. `mysql-migrations` will produce migration file prefixed with current timestamp
3. For multiple SQL commands in a single migration, following syntax can be used:
```
module.exports = {
  up: (conn, cb) => {
    conn.query('CREATE TABLE test (id INT AUTO_INCREMENT PRIMARY KEY, value VARCHAR(255))');
    conn.query("INSERT INTO test (value) VALUES ('db test')");
    cb();
  },
  down: 'DROP TABLE test',
};
```
4. Migrating is then controlled with `npm migrate up` command that runs all not yet executed migrations and `npm run migrate down` which undoes the last executed migration.