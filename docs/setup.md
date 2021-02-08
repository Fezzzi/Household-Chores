# Application Setup
### Requirements
 - git (obviously)
 - npm
 - Node
 - MySQL

### Versions
 - **MySQL:** 8.0+
 - **Node:** 12+

## How to set up and run
1. clone the repository
2. run `npm install` and `npm run configure` from the project root
3. install [mysql server](https://dev.mysql.com/downloads/installer/) if needed
    - start the mysql service
    - login as root with `mysql -u root -p` (default password is usually `mysql`)
    - create `household` database with `CREATE DATABASE household;`
    - create `household` user with `CREATE USER household@localhost IDENTIFIED BY '<your password>';`
    - fix it with `ALTER USER household@localhost IDENTIFIED WITH mysql_native_password BY '<your password>';`
    - assign user the new database with `GRANT ALL PRIVILEGES ON household.* TO household@localhost WITH GRANT OPTION;`
4. create a copy of `.env.example`, rename it to`.env` and set up DB connection
5. run `npm run migrate up` from the project root
6. run `npm run dev`

## How to start working
 1. start the `MySQL` service
 2. run `git fetch` and `git fetch origin develop:develop` from project root
 3. on new branch:
  a. create new branch with `git checkout -b <name-of-new-branch>`
  3.2.
