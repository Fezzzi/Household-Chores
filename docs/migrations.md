# Migrations
Migrating is controlled with two scripts:
 - `npm migrate up` that runs all not yet executed migrations
 - `npm run migrate down` that rollbacks the last 1 executed migration.

## New Migration
 1. First, run `npm run migrate add migration <migration name>`
 2. `mysql-migrations` will produce migration file prefixed with current timestamp according to following template:
    ```
    import { migrateWithQueries } from 'serverSrc/helpers/migrations'
    
    module.exports = {
      up: async (conn, cb) => await migrateWithQueries(cb, async () => {}),
      down: async (conn, cb) => await migrateWithQueries(cb, async () => {}),
    }
    ```
 3. Queries under the `up` property are executed on when migrating **up**, queries under the 
 `down` property are executed when migrating **down** and should therefore perform reverse
 operation.
 4. The second argument of `migrateWithQueries` is function performing the queries and returning `Promise<boolean>`.

---

| Previous Page | Next Page |
|:-------------:|:-----:|
| <sup>[Application Setup](./setup.md)</sup>  | <sup>[Localization](./localization.md)</sup> |
