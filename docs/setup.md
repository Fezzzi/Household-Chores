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
2. run `git fetch` and `git fetch origin development:development` from project root
3. **(on new branch)**:
    1. create new branch with `git checkout -b <name-of-new-branch>`
4. **(on existing branch)**:
    1. if you didn't commit your local changes, stash them with `git stash "<stash-name>"` (see local changes with `git status`)
    2. run `git pull` to sync with remote
    3. rebase branch on `origin/development`
    4. pop previously stashed local changes if needed with `git stash pop`
5. run `npm install` and `npm run migrate up`
6. always commit changes with `git commit -a -m "<commit-message>"` and
push them with `git push` at the end of coding session (if you expect
someone else working on the branch as well)

---

| Previous Page | Next Page |
|:-------------:|:-----:|
| <sup>[Home](./readme.md)</sup> | <sup>[Migrations](./migrations.md)</sup> |
