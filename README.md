# Household-Chores
App for household managing


## Build status
**master** \
[![Build Status](https://dev.azure.com/filiphorkycz/Household-Chores/_apis/build/status/Fezzzi.Household-Chores?branchName=master)](https://dev.azure.com/filiphorkycz/Household-Chores/_build/latest?definitionId=1&branchName=master)

**development** \
[![Build Status](https://dev.azure.com/filiphorkycz/Household-Chores/_apis/build/status/Fezzzi.Household-Chores?branchName=development)](https://dev.azure.com/filiphorkycz/Household-Chores/_build/latest?definitionId=1&branchName=development)


## How to set up and run
1. run `npm install` and `npm run configure` from the project root
2. install [mysql server](https://dev.mysql.com/downloads/installer/) if needed
    - start the mysql service
    - login as root with `mysql -u root -p` (default password is usually `mysql`)
    - create `household` database with `CREATE DATABASE household;`
    - **for mysql < 8**
    - create `household` user and assign it to the new database with `GRANT ALL PRIVILEGES ON household.* to household@localhost IDENTIFIED BY '<your password>';`
    - **for mysql 8+**
    - create `household` user with `CREATE USER household@localhost IDENTIFIED BY '<your password>';`
    - fix it with `ALTER USER household@localhost IDENTIFIED WITH mysql_native_password BY '<your password>';`
    - assign user the new database with `GRANT ALL PRIVILEGES ON household.* TO household@localhost WITH GRANT OPTION;`
3. create a copy of `.env.example`, rename it to`.env` and set up DB connection
5. run `npm run migrate up` from the project root
6. run `npm run start-back` and `npm run start-front`


## Examples
### New Migrations
 1. First, run `npm run migrate add migration <migration name>`
 2. `mysql-migrations` will produce migration file prefixed with current timestamp
 3. Replace the content of produced `.json` file with the following code and fill `&&` separated queries on place of `...`:
```
import { migrateWithQueries } from 'serverSrc/helpers/migrations';

module.exports = {
  up: (conn, cb) => migrateWithQueries(cb,
    ...
  ),
  down: (conn, cb) => migrateWithQueries(cb,
    ...
  ),
}

```

Migrating is then controlled with the `npm migrate up` command that runs all not yet executed migrations and `npm run migrate down` which rollbacks the last 1 executed migration.
