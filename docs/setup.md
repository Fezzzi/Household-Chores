# Application Setup
### Requirements
 - yarn
 - Node
 - PostgreSQL

### Versions
 - **PostgreSQL:** 10+
 - **Node:** 14+

## How to set up and run
1. Run `yarn install` and `yarn configure` from the project root
1. Install [PostgreSQL](https://www.postgresqltutorial.com/postgresql-getting-started/) if needed
    - start the postgres service
    - create `household` database
    - create `household` user and the assign it as an owner of the new database
1. Create a copy of `.env.example`, rename it to`.env` and set up DB connection
1. Run `yarn migrate up` from the project root
1. Run `yarn dev`

---

| Previous Page | Next Page |
|:-------------:|:-----:|
| <sup>[Home](./readme.md)</sup> | <sup>[Migrations](./migrations.md)</sup> |
