import { MigrationBuilder } from 'node-pg-migrate'

exports.up = (pgm: MigrationBuilder) => {
  pgm.sql(`
    CREATE TABLE "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE)
  `)

  pgm.sql(`
    ALTER TABLE "session"
    ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE
  `)

  pgm.sql(`
    CREATE INDEX "IDX_session_expire" ON "session" ("expire")
  `)
}

exports.down = (pgm: MigrationBuilder) => pgm.sql(`
  DROP TABLE "session"
`)
