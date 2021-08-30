# Migrations
Migrating is controlled with two scripts:
 - `npm run migrate up` that runs all not yet executed migrations
 - `npm run migrate down` that rollbacks the last 1 executed migration.

## New Migration
 1. First, run `npm run migrate create <migration name>`.
 1. `node-pg-migrate` will produce migration file prefixed with current timestamp according to
 `config/migration-template.ts` template.
 1. Queries under the `up` property are executed when migrating **up**, queries under the 
 `down` property are executed when migrating **down** and should therefore perform reverse
 operations.

---

| Previous Page | Next Page |
|:-------------:|:-----:|
| <sup>[Application Setup](./setup.md)</sup>  | <sup>[Localization](./localization.md)</sup> |
